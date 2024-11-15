import { db } from '../../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, arrayUnion, arrayRemove, Timestamp, getDocs, writeBatch, getDoc } from 'firebase/firestore';
import { message } from 'antd'


export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const ASSIGN_TASK_REQUEST = 'ASSIGN_TASK_REQUEST';
export const ASSIGN_TASK_SUCCESS = 'ASSIGN_TASK_SUCCESS';
export const ASSIGN_TASK_FAILURE = 'ASSIGN_TASK_FAILURE';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

const getUserNameById = (userId, state) => {
  const user = state.users.users.find(u => u.id === userId);
  if (user) return user.name;
  const customer = state.customers.customers.find(c => c.id === userId);
  return customer ? customer.name : 'Bilinmiyor';
};


// export const addTask = (taskData, currentUserId) => {
//   return async (dispatch) => {
//     dispatch({ type: CREATE_TASK_REQUEST });
//     try {
//       const docRef = await addDoc(collection(db, 'tasks'), {
//         ...taskData,
//         createdAt: Timestamp.fromDate(new Date()),
//         updatedAt: Timestamp.fromDate(new Date()),
//         history: [
//           {
//             changeType: 'update', 
//             description: 'Görev oluşturuldu.',
//             changedBy: currentUserId,
//             timestamp: Timestamp.fromDate(new Date()),
//           },
//         ],
//       });
//       dispatch({ type: CREATE_TASK_SUCCESS, payload: { id: docRef.id, ...taskData } });
//       message.success('Görev başarıyla oluşturuldu.');

//     } catch (error) {
//       dispatch({ type: CREATE_TASK_FAILURE, payload: error.message });
//       message.error('Görev oluşturulurken bir hata oluştu.');

//     }
//   };
// };


export const addTask = (taskData, currentUserId) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_TASK_REQUEST });
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

      const newTask = {
        ...taskInfo,
        attachments: attachmentURLs,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
        createdUser: currentUserId,
        history: [
          {
            changeType: 'update',
            description: 'Görev oluşturuldu.',
            changedBy: currentUserId,
            timestamp: Timestamp.fromDate(new Date()),
          },
        ],
      };

      const docRef = await addDoc(collection(db, 'tasks'), newTask);

      dispatch({ type: CREATE_TASK_SUCCESS, payload: { id: docRef.id, ...newTask } });
      message.success('Görev başarıyla oluşturuldu.');
    } catch (error) {
      dispatch({ type: CREATE_TASK_FAILURE, payload: error.message });
      message.error('Görev oluşturulurken bir hata oluştu.');
      console.error('Görev oluşturma hatası:', error);
    }
  };
};

export const fetchTasks = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TASKS_REQUEST });
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: FETCH_TASKS_SUCCESS, payload: tasks });
    } catch (error) {
      dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
      message.error('Görev çekilirken bir hata oluştu.');

    }
  };
};




export const assignTask = (taskId, newAssignees, currentUserId) => {
  return async (dispatch, getState) => {
    dispatch({ type: ASSIGN_TASK_REQUEST });
    try {
      const state = getState();

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
        const addedNames = addedAssignees.map(id => getUserNameById(id, state)).join(', ');
        batch.update(taskRef, {
          history: arrayUnion({
            changeType: 'assign',
            description: `Göreve atandı: ${addedNames}`,
            changedBy: currentUserId,
            timestamp: Timestamp.fromDate(new Date()),
          }),
        });
      }

      if (removedAssignees.length > 0) {
        const removedNames = removedAssignees.map(id => getUserNameById(id, state)).join(', ');
        batch.update(taskRef, {
          history: arrayUnion({
            changeType: 'unassign',
            description: `Görevden çıkarıldı: ${removedNames}`,
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

      dispatch({ type: ASSIGN_TASK_SUCCESS, payload: updatedTaskData });
      message.success('Görev başarıyla atandı ve güncellendi.');
    } catch (error) {
      dispatch({ type: ASSIGN_TASK_FAILURE, payload: error.message });
      message.error('Görev atanırken veya güncellenirken bir hata oluştu.');
    }
  };
};



export const updateTask = (taskId, updatedData, currentUserId) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TASK_REQUEST });
    try {
      const taskRef = doc(db, 'tasks', taskId);
      const updatePayload = {
        ...updatedData,
        updatedAt: Timestamp.fromDate(new Date()),
      };

      let description = 'Görev güncellendi: ';
      if (updatedData.title) {
        description += `Başlık '${updatedData.title}' olarak değiştirildi. `;
      }
      if (updatedData.completed !== undefined) {
        description += `Görev ${updatedData.completed ? 'tamamlandı' : 'tamamlanmadı'} olarak güncellendi. `;
      }
      if (updatedData.description) {
        description += `Açıklama güncellendi. `;
      }

      await updateDoc(taskRef, {
        ...updatePayload,
        history: arrayUnion({
          changeType: 'update',
          description: description.trim(),
          changedBy: currentUserId,
          timestamp: Timestamp.fromDate(new Date()),
        }),
      });

      const taskSnap = await getDoc(taskRef);
      const updatedTaskData = { id: taskSnap.id, ...taskSnap.data() };

      dispatch({ type: UPDATE_TASK_SUCCESS, payload: updatedTaskData });
      message.success('Görev başarıyla güncellendi.');
    } catch (error) {
      dispatch({ type: UPDATE_TASK_FAILURE, payload: error.message });
      message.error('Görev güncellenirken bir hata oluştu.');
    }
  };
};


export const addComment = (taskId, comment, currentUserId, attachments) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TASK_REQUEST });
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
      dispatch({ type: ADD_COMMENT_SUCCESS, payload: updatedTaskData });
      message.success('Yorum başarıyla eklendi.');
    } catch (error) {
      dispatch({ type: UPDATE_TASK_FAILURE, payload: error.message });
      console.error('Yorum ekleme hatası:', error);
      throw error;
    }
  };
};


export const deleteTask = (taskId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_TASK_REQUEST });
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
      dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
      message.success('Görev başarıyla silindi.');

    } catch (error) {
      dispatch({ type: DELETE_TASK_FAILURE, payload: error.message });
      message.error('Görev silinirken bir hata oluştu.');

    }
  };
};
