import { db } from '../../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, arrayUnion, arrayRemove, Timestamp, writeBatch, getDoc, onSnapshot } from 'firebase/firestore';
import * as types from '../constants/taskActionTypes';


// const getUserNameById = (userId, state) => {
//   const user = state.users.users.find(u => u.id === userId);
//   if (user) return user.name;
//   const customer = state.customers.customers.find(c => c.id === userId);
//   return customer ? customer.name : 'Bilinmiyor';
// };

export const addTask = (taskData, currentUserId) => {
  return async (dispatch) => {
    dispatch({ type: types.CREATE_TASK_REQUEST });
    try {
      const { attachments, ...taskInfo } = taskData;
      let attachmentURLs = [];

      if (attachments && attachments.fileList && attachments.fileList.length > 0) {
        const uploadPromises = attachments.fileList.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file.originFileObj);
          formData.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_API_KEY}/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
          const data = await response.json();

          if (data.secure_url) {
            return data.secure_url;
          } else {
            throw new Error('Cloudinary yükleme hatası: ' + data.error.message);
          }
        });

        attachmentURLs = await Promise.all(uploadPromises);
      }

      const calculateDueDate = (priority) => {
        const now = new Date();
        switch (priority) {
          case 'urgent':
            return new Date(now.setDate(now.getDate() + 1));
          case 'soon':
            return new Date(now.setDate(now.getDate() + 3));
          case 'can wait':
            return new Date(now.setMonth(now.getMonth() + 6));
          default:
            return null;
        }
      };

      const dueDate = calculateDueDate(taskData.priority);

      const newTask = {
        ...taskInfo,
        attachments: attachmentURLs,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
        dueDate: dueDate ? Timestamp.fromDate(dueDate) : null,
        createdUser: currentUserId,
        status: 'open',
        history: [
          {
            changeType: 'firsthistory',
            description: '',
            changedBy: currentUserId,
            timestamp: Timestamp.fromDate(new Date()),
          },
        ],
      };

      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      const taskId = docRef.id;

      if (taskData.customer) {
        const customerRef = doc(db, 'customers', taskData.customer);
        await updateDoc(customerRef, {
          createdTasks: arrayUnion(taskId)
        });
      }

      if (taskData.projectId) {
        const projectRef = doc(db, 'projects', taskData.projectId);
        await updateDoc(projectRef, {
          assignedTasks: arrayUnion(taskId)
        });
      }
      dispatch({ type: types.CREATE_TASK_SUCCESS, payload: { id: docRef.id, ...newTask } });
    } catch (error) {
      dispatch({ type: types.CREATE_TASK_FAILURE, payload: error.message });

    }
  };
};


export const fetchTasks = () => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_TASKS_REQUEST });

    try {
      const tasksCollection = collection(db, "tasks");
      const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: types.FETCH_TASKS_SUCCESS, payload: tasks });
      });

      return unsubscribe;
    } catch (error) {
      dispatch({ type: types.FETCH_TASKS_FAILURE, payload: error.message });
      console.error("Görevler alınırken hata oluştu:", error);
    }
  };
};



export const assignTask = (taskId, newAssignees, currentUserId) => {
  return async (dispatch, getState) => {
    dispatch({ type: types.ASSIGN_TASK_REQUEST });
    try {
      // const state = getState();

      const taskRef = doc(db, 'tasks', taskId);
      const taskSnap = await getDoc(taskRef);
      if (!taskSnap.exists()) {
        throw new Error('Görev bulunamadı.');
      }
      const taskData = taskSnap.data();
      const currentAssignees = taskData.assignedTo || [];

      const removedAssignees = currentAssignees.filter(userId => !newAssignees.includes(userId));
      const addedAssignees = newAssignees.filter(userId => !currentAssignees.includes(userId));

      const batch = writeBatch(db);

      batch.update(taskRef, {
        assignedTo: newAssignees,
        updatedAt: Timestamp.fromDate(new Date()),
      });

      if (addedAssignees.length > 0) {
        // const addedNames = addedAssignees.map(id => getUserNameById(id, state)).join(', ');
        batch.update(taskRef, {
          history: arrayUnion({
            changeType: 'assign',
            description: `${addedAssignees}`,
            changedBy: currentUserId,
            timestamp: Timestamp.fromDate(new Date()),
          }),
        });
      }

      if (removedAssignees.length > 0) {
        // const removedNames = removedAssignees.map(id => getUserNameById(id, state)).join(', ');
        batch.update(taskRef, {
          history: arrayUnion({
            changeType: 'unassign',
            description: `${removedAssignees}`,
            changedBy: currentUserId,
            timestamp: Timestamp.fromDate(new Date()),
          }),
        });
      }

      addedAssignees.forEach(userId => {
        const userRef = doc(db, 'users', userId);
        batch.update(userRef, {
          assignedTasks: arrayUnion(taskId),
        });
      });

      removedAssignees.forEach(userId => {
        const userRef = doc(db, 'users', userId);
        batch.update(userRef, {
          assignedTasks: arrayRemove(taskId),
        });
      });

      await batch.commit();

      const updatedTaskSnap = await getDoc(taskRef);
      const updatedTaskData = { id: updatedTaskSnap.id, ...updatedTaskSnap.data() };

      dispatch({ type: types.ASSIGN_TASK_SUCCESS, payload: updatedTaskData });
    } catch (error) {
      dispatch({ type: types.ASSIGN_TASK_FAILURE, payload: error.message });
    }
  };
};



export const updateTask = (taskId, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_TASK_REQUEST });
    try {
      const taskRef = doc(db, 'tasks', taskId);
      const taskSnap = await getDoc(taskRef);

      console.log(updatedData)
      if (!taskSnap.exists()) throw new Error("Görev bulunamadı!");

      const existingTask = taskSnap.data();
      const updatePayload = {
        ...updatedData,
        updatedAt: Timestamp.fromDate(new Date()),
      };

      const historyEntries = [];

      if (updatedData.title && updatedData.title !== existingTask.title) {
        historyEntries.push({
          changeType: 'titleupdate',
          description: `${updatedData.title}`,
          changedBy: updatedData.changedBy,
          timestamp: Timestamp.fromDate(new Date()),
        });
      }

      if (updatedData.description && updatedData.description !== existingTask.description) {
        historyEntries.push({
          changeType: 'descriptionupdate',
          description: `${updatedData.description}`,
          changedBy: updatedData.changedBy,
          timestamp: Timestamp.fromDate(new Date()),
        });
      }

      if (updatedData.customer && updatedData.customer !== existingTask.customer) {
        historyEntries.push({
          changeType: 'customerupdate',
          description: `${updatedData.customer}`,
          changedBy: updatedData.changedBy,
          timestamp: Timestamp.fromDate(new Date()),
        });
      }

      if (updatedData.category && updatedData.category !== existingTask.category) {
        historyEntries.push({
          changeType: 'categoryupdate',
          description: `${updatedData.category}`,
          changedBy: updatedData.changedBy,
          timestamp: Timestamp.fromDate(new Date()),
        });
      }


      if (updatedData.priority && updatedData.priority !== existingTask.priority) {
        const calculateDueDate = (priority) => {
          const now = new Date();
          switch (priority) {
            case 'urgent': return new Date(now.setDate(now.getDate() + 1));
            case 'soon': return new Date(now.setDate(now.getDate() + 3));
            case 'can-wait': return new Date(now.setMonth(now.getMonth() + 6));
            default: return null;
          }
        };
        const newDueDate = calculateDueDate(updatedData.priority);
        if (newDueDate) {
          updatePayload.dueDate = Timestamp.fromDate(newDueDate);
        }
        historyEntries.push({
          changeType: 'priorityupdate',
          description: `${updatedData.priority}`,
          changedBy: updatedData.changedBy,
          timestamp: Timestamp.fromDate(new Date()),
        });
      }

      if (updatedData.status && updatedData.status !== existingTask.status) {
        historyEntries.push({
          changeType: 'statusupdate',
          description: `${updatedData.status}`,
          changedBy: updatedData.changedBy,
          timestamp: Timestamp.fromDate(new Date()),
        });
      }


      if (updatedData.projectId) {
        const projectRef = doc(db, 'projects', updatedData.projectId);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          const projectData = projectSnap.data();
          if (projectData?.customerId && existingTask?.customerId && projectData.customerId !== existingTask.customerId) {
            throw new Error('Farklı müşterinin görevi bu projeye atanamaz.');
          }
          await updateDoc(projectRef, {
            assignedTasks: arrayUnion(taskId)
          });
        }
      }

      const batch = writeBatch(db);
      batch.update(taskRef, {
        ...updatePayload,
        history: arrayUnion(...historyEntries),
      });

      // await updateDoc(taskRef, {
      //   ...updatePayload,
      //   history: arrayUnion({
      //     changeType: 'update',
      //     description: description.trim(),
      //     changedBy: currentUserId,
      //     timestamp: Timestamp.fromDate(new Date()),
      //   }),
      // });
      await batch.commit();
      const updatedTaskSnap = await getDoc(taskRef);
      const updatedTaskData = { id: updatedTaskSnap.id, ...updatedTaskSnap.data() };

      console.log(updatedTaskData)
      dispatch({ type: types.UPDATE_TASK_SUCCESS, payload: updatedTaskData });
    } catch (error) {
      dispatch({ type: types.UPDATE_TASK_FAILURE, payload: error.message });
    }
  };
};



export const addComment = (taskId, comment, currentUserId, attachments) => {
  return async (dispatch) => {
    dispatch({ type: types.ADD_COMMENT_REQUEST });
    try {
      let attachmentURLs = [];
      if (attachments && attachments.fileList && attachments.fileList.length > 0) {
        const uploadPromises = attachments.fileList.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file.originFileObj);
          formData.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_API_KEY}/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
          const data = await response.json();

          if (data.secure_url) {
            return data.secure_url;
          } else {
            throw new Error('Cloudinary yükleme hatası: ' + data.error.message);
          }
        });

        attachmentURLs = await Promise.all(uploadPromises);
      }

      const taskRef = doc(db, 'tasks', taskId);
      const newComment = {
        changeType: 'comment',
        description: comment,
        changedBy: currentUserId,
        timestamp: Timestamp.fromDate(new Date()),
        attachments: attachmentURLs
      };
      await updateDoc(taskRef, {
        history: arrayUnion(newComment),
      });
      // await updateDoc(taskRef, {
      //   history: arrayUnion({
      //     changeType: 'comment',
      //     description: commentText,
      //     changedBy: currentUserId,
      //     timestamp: Timestamp.fromDate(new Date()),
      //     attachments: attachmentURLs, 
      //   }),
      //   updatedAt: Timestamp.fromDate(new Date()),
      // });

      const taskSnap = await getDoc(taskRef);
      const updatedTaskData = { id: taskSnap.id, ...taskSnap.data() };
      console.log(updatedTaskData)
      dispatch({ type: types.ADD_COMMENT_SUCCESS, payload: updatedTaskData });
    } catch (error) {
      dispatch({ type: types.ADD_COMMENT_FAILURE, payload: error.message });
      throw error;
    }
  };
};


export const deleteTask = (taskId) => {
  return async (dispatch) => {
    dispatch({ type: types.DELETE_TASK_REQUEST });
    try {
      const taskRef = doc(db, 'tasks', taskId);
      const taskSnap = await getDoc(taskRef);
      if (!taskSnap.exists()) {
        throw new Error('Task not found');
      }
      const taskData = taskSnap.data();
      await deleteDoc(taskRef);

      if (taskData.projectId) {
        const projectRef = doc(db, 'projects', taskData.projectId);
        await updateDoc(projectRef, {
          assignedTasks: arrayRemove(taskId)
        });
      }

      if (taskData.assignedTo && Array.isArray(taskData.assignedTo)) {
        await Promise.all(
          taskData.assignedTo.map((userId) => {
            const userRef = doc(db, 'users', userId);
            return updateDoc(userRef, {
              assignedTasks: arrayRemove(taskId)
            });
          })
        );
      }

      if (taskData.customer) {
        const customerRef = doc(db, 'customers', taskData.customer);
        await updateDoc(customerRef, {
          createdTasks: arrayRemove(taskId)
        });
      }

      dispatch({ type: types.DELETE_TASK_SUCCESS, payload: taskId });

    } catch (error) {
      dispatch({ type: types.DELETE_TASK_FAILURE, payload: error.message });

    }
  };
};
