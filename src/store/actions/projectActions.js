import { db } from '../../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, arrayUnion, arrayRemove, Timestamp, getDocs, writeBatch, getDoc, deleteField } from 'firebase/firestore';
import { message } from 'antd'
import * as types from '../constants/projectActionTypes';


const getUserNameById = (userId, state) => {
  const user = state.users.users.find(u => u.id === userId);
  if (user) return user.name;
  const customer = state.customers.customers.find(c => c.id === userId);
  return customer ? customer.name : 'Bilinmiyor';
};

export const fetchProjects = () => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_PROJECTS_REQUEST });
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: types.FETCH_PROJECTS_SUCCESS, payload: projects });
    } catch (error) {
      dispatch({ type: types.FETCH_PROJECTS_FAILURE, payload: error.message });
    }
  };
};

export const addProject = (projectData) => {
  return async (dispatch) => {
    dispatch({ type: types.ADD_PROJECT_REQUEST });
    try {

      const data = {
        ...projectData,
        status:'open',
        assignedUsers: projectData.assignedUsers || [],
        assignedTasks: projectData.assignedTasks || [],
        startDate: projectData.startDate ? Timestamp.fromDate(new Date(projectData.startDate)) : null,
        endDate: projectData.endDate ? Timestamp.fromDate(new Date(projectData.endDate)) : null,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };

      const docRef = await addDoc(collection(db, 'projects'), data);

      const newProject = { id: docRef.id, ...data };

      // console.log('Proje Verisi:', projectData);
      // console.log('Proje Verisi new:', newProject);
      dispatch({ type: types.ADD_PROJECT_SUCCESS, payload: newProject });

    } catch (error) {
      console.error('Hata:', error.message);
      dispatch({ type: types.ADD_PROJECT_FAILURE, payload: error.message });
    }
  };
};



// export const updateProject = (projectId, updatedData) => {
//   return async (dispatch, getState) => {
//     dispatch({ type: types.UPDATE_PROJECT_REQUEST });
//     try {
//       const projectRef = doc(db, 'projects', projectId);
//       const projectSnap = await getDoc(projectRef);
//       if (!projectSnap.exists()) {
//         throw new Error('Proje bulunamadı.');
//       }

//       const projectData = projectSnap.data();

//       const oldAssignedTasks = projectData.assignedTasks || [];
//       const newAssignedTasks = updatedData.assignedTasks || [];

//       const startDateVal = updatedData.startDate instanceof Date ? Timestamp.fromDate(updatedData.startDate) : updatedData.startDate;
//       const endDateVal = updatedData.endDate instanceof Date ? Timestamp.fromDate(updatedData.endDate) : updatedData.endDate;

//       const data = {
//         ...updatedData,
//         assignedUsers: updatedData.assignedUsers || [],
//         assignedTasks: newAssignedTasks,
//         startDate: startDateVal || null,
//         endDate: endDateVal || null,
//         updatedAt: Timestamp.fromDate(new Date()),
//       };


//       const batch = writeBatch(db);

//       batch.update(projectRef, data);

//       const addedTasks = newAssignedTasks.filter(taskId => !oldAssignedTasks.includes(taskId));
//       const removedTasks = oldAssignedTasks.filter(taskId => !newAssignedTasks.includes(taskId));

//       for (const taskId of addedTasks) {
//         const taskRef = doc(db, 'tasks', taskId);
//         batch.update(taskRef, {
//           projectId: projectId,
//           updatedAt: Timestamp.fromDate(new Date()),
//         });
//       }

//       for (const taskId of removedTasks) {
//         const taskRef = doc(db, 'tasks', taskId);
//         batch.update(taskRef, {
//           projectId: null,
//           updatedAt: Timestamp.fromDate(new Date()),
//         });
//       }


//       if (addedTasks.length > 0 || removedTasks.length > 0) {
//         const historyEntry = {
//           changeType: 'taskupdate',
//           description: `Görev güncellemeleri yapıldı.`,
//           changedBy: updatedData.changedBy || 'System',
//           timestamp: Timestamp.fromDate(new Date()),
//         };

//         batch.update(projectRef, {
//           history: arrayUnion(historyEntry),
//         });
//       }

//       if (updatedData.status !== projectData.status) {
//         const description = `Proje durumu ${updatedData.status === 'close' ? 'tamamlandı' : 'tamamlanmadı'} olarak güncellendi.`;

//         const historyEntry = {
//           changeType: 'update',
//           description,
//           changedBy: updatedData.changedBy || 'System',
//           timestamp: Timestamp.fromDate(new Date()),
//         };

//         batch.update(projectRef, {
//           history: arrayUnion(historyEntry),
//         });
//       }

//       if (addedTasks.length > 0 || removedTasks.length > 0) {
//         const historyEntry = {
//           changeType: 'taskupdate',
//           description: 'Görev güncellemeleri yapıldı.',
//           changedBy: updatedData.changedBy || 'System',
//           timestamp: Timestamp.fromDate(new Date()),
//         };
//         batch.update(projectRef, {
//           history: arrayUnion(historyEntry),
//         });
//       }


//       await batch.commit();

//       const updatedProjectSnap = await getDoc(projectRef);
//       const updatedProjectData = { id: updatedProjectSnap.id, ...updatedProjectSnap.data() };

//       dispatch({
//         type: types.UPDATE_PROJECT_SUCCESS,
//         payload: updatedProjectData,
//       });
//       message.success('Proje başarıyla güncellendi.');
//     } catch (error) {
//       dispatch({ type: types.UPDATE_PROJECT_FAILURE, payload: error.message });
//       message.error('Proje güncellenirken bir hata oluştu.');
//     }
//   };
// };

export const updateProject = (projectId, updatedData) => {
  return async (dispatch, getState) => {
    dispatch({ type: types.UPDATE_PROJECT_REQUEST });
    try {
      const projectRef = doc(db, 'projects', projectId);
      const projectSnap = await getDoc(projectRef);
      if (!projectSnap.exists()) {
        throw new Error('Proje bulunamadı.');
      }

      // console.log(updatedData)
      const projectData = projectSnap.data();

      const oldAssignedTasks = projectData.assignedTasks || [];
      const newAssignedTasks = updatedData.assignedTasks || [];

      const startDateVal = updatedData.startDate instanceof Date ? Timestamp.fromDate(updatedData.startDate) : updatedData.startDate;
      const endDateVal = updatedData.endDate instanceof Date ? Timestamp.fromDate(updatedData.endDate) : updatedData.endDate;

      const data = {
        ...updatedData,
        assignedUsers: updatedData.assignedUsers || [],
        assignedTasks: newAssignedTasks,
        startDate: startDateVal || null,
        endDate: endDateVal || null,
        updatedAt: Timestamp.fromDate(new Date()),
      };


      const batch = writeBatch(db);

      batch.update(projectRef, data);

      const addedTasks = newAssignedTasks.filter(taskId => !oldAssignedTasks.includes(taskId));
      const removedTasks = oldAssignedTasks.filter(taskId => !newAssignedTasks.includes(taskId));

      for (const taskId of addedTasks) {
        const taskRef = doc(db, 'tasks', taskId);
        batch.update(taskRef, {
          projectId: projectId,
          updatedAt: Timestamp.fromDate(new Date()),
        });
      }

      for (const taskId of removedTasks) {
        const taskRef = doc(db, 'tasks', taskId);
        batch.update(taskRef, {
          projectId: null,
          updatedAt: Timestamp.fromDate(new Date()),
        });
      }
      const historyUpdates = [];
      if (updatedData.category !== projectData.category) {
        historyUpdates.push({
          changeType: 'update',
          description: `Kategori güncellendi: '${updatedData.category || 'N/A'}'`,
          changedBy: updatedData.changedBy || 'System',
          timestamp: Timestamp.fromDate(new Date()),
        });
      }

      if (updatedData.priority !== projectData.priority) {
        historyUpdates.push({
          changeType: 'update',
          description: `Öncelik güncellendi: '${updatedData.priority || 'N/A'}'`,
          changedBy: updatedData.changedBy || 'System',
          timestamp: Timestamp.fromDate(new Date()),
        });
      }

      historyUpdates.forEach((entry) => {
        batch.update(projectRef, {
          history: arrayUnion(entry),
        });
      });

      if (addedTasks.length > 0 || removedTasks.length > 0) {
        const historyEntry = {
          changeType: 'taskupdate',
          description: `Görev güncellemeleri yapıldı.`,
          changedBy: updatedData.changedBy || 'System',
          timestamp: Timestamp.fromDate(new Date()),
        };

        batch.update(projectRef, {
          history: arrayUnion(historyEntry),
        });
      }

      if (updatedData.status !== projectData.status) {
        const description = `Proje durumu ${updatedData.status === 'close' ? 'tamamlandı' : 'tamamlanmadı'} olarak güncellendi.`;

        const historyEntry = {
          changeType: 'update',
          description,
          changedBy: updatedData.changedBy || 'System',
          timestamp: Timestamp.fromDate(new Date()),
        };

        batch.update(projectRef, {
          history: arrayUnion(historyEntry),
        });
      }

      if (addedTasks.length > 0 || removedTasks.length > 0) {
        const historyEntry = {
          changeType: 'taskupdate',
          description: 'Görev güncellemeleri yapıldı.',
          changedBy: updatedData.changedBy || 'System',
          timestamp: Timestamp.fromDate(new Date()),
        };
        batch.update(projectRef, {
          history: arrayUnion(historyEntry),
        });
      }


      await batch.commit();

      const updatedProjectSnap = await getDoc(projectRef);
      const updatedProjectData = { id: updatedProjectSnap.id, ...updatedProjectSnap.data() };

      dispatch({
        type: types.UPDATE_PROJECT_SUCCESS,
        payload: updatedProjectData,
      });
    } catch (error) {
      dispatch({ type: types.UPDATE_PROJECT_FAILURE, payload: error.message });
    }
  };
};

export const deleteProject = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: types.DELETE_PROJECT_REQUEST });
    try {
      const projectRef = doc(db, 'projects', projectId);
      const projectSnap = await getDoc(projectRef);
      if (!projectSnap.exists()) {
        throw new Error('Project not found');
      }
      const projectData = projectSnap.data();
      const { assignedTasks, assignedUsers, customerId } = projectData;

      await deleteDoc(projectRef);

      if (Array.isArray(assignedTasks) && assignedTasks.length > 0) {
        await Promise.all(
          assignedTasks.map(async (taskId) => {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, {
              projectId: deleteField()
            });
          })
        );
      }

      if (Array.isArray(assignedUsers) && assignedUsers.length > 0) {
        await Promise.all(
          assignedUsers.map(async (userId) => {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
              assignedProjects: arrayRemove(projectId)
            });
          })
        );
      }

      if (customerId) {
        const customerRef = doc(db, 'customers', customerId);
        await updateDoc(customerRef, {
          projects: arrayRemove(projectId)
        });
      }

      dispatch({ type: types.DELETE_PROJECT_SUCCESS, payload: projectId });
    } catch (error) {
      dispatch({ type: types.DELETE_PROJECT_FAILURE, payload: error.message });
    }
  };
};

export const assignProject = (projectId, newAssignees, currentUserId) => {
  return async (dispatch, getState) => {
    dispatch({ type: types.ASSIGN_PROJECT_REQUEST });
    try {
      const state = getState();

      const projectRef = doc(db, 'projects', projectId);
      const projectSnap = await getDoc(projectRef);
      if (!projectSnap.exists()) {
        throw new Error('Proje bulunamadı.');
      }
      const projectData = projectSnap.data();
      const currentAssignees = projectData.assignedUsers || [];

      const removedAssignees = currentAssignees.filter(userId => !newAssignees.includes(userId));
      const addedAssignees = newAssignees.filter(userId => !currentAssignees.includes(userId));

      const batch = writeBatch(db);

      batch.update(projectRef, {
        assignedUsers: newAssignees,
        updatedAt: Timestamp.fromDate(new Date()),
      });

      if (addedAssignees.length > 0) {
        const addedNames = addedAssignees.map(id => getUserNameById(id, state)).join(', ');
        batch.update(projectRef, {
          history: arrayUnion({
            changeType: 'assign',
            description: `Projeye atandı: ${addedNames}`,
            changedBy: currentUserId,
            timestamp: Timestamp.fromDate(new Date()),
          }),
        });
      }

      if (removedAssignees.length > 0) {
        const removedNames = removedAssignees.map(id => getUserNameById(id, state)).join(', ');
        batch.update(projectRef, {
          history: arrayUnion({
            changeType: 'unassign',
            description: `Projeden çıkarıldı: ${removedNames}`,
            changedBy: currentUserId,
            timestamp: Timestamp.fromDate(new Date()),
          }),
        });
      }

      addedAssignees.forEach(userId => {
        const userRef = doc(db, 'users', userId);
        batch.update(userRef, {
          assignedProjects: arrayUnion(projectId),
        });
      });

      removedAssignees.forEach(userId => {
        const userRef = doc(db, 'users', userId);
        batch.update(userRef, {
          assignedProjects: arrayRemove(projectId),
        });
      });

      await batch.commit();

      const updatedProjectSnap = await getDoc(projectRef);
      const updatedProjectData = { id: updatedProjectSnap.id, ...updatedProjectSnap.data() };

      dispatch({ type: types.ASSIGN_PROJECT_SUCCESS, payload: updatedProjectData });
      message.success('Proje başarıyla atandı ve güncellendi.');
    } catch (error) {
      dispatch({ type: types.ASSIGN_PROJECT_FAILURE, payload: error.message });
      message.error('Proje atanırken veya güncellenirken bir hata oluştu.');
    }
  };
};

export const addComment = (projectId, comment, currentUserId, attachments) => {
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

      const projectRef = doc(db, 'projects', projectId);
      const newComment = {
        changeType: 'comment',
        description: comment,
        changedBy: currentUserId,
        timestamp: Timestamp.fromDate(new Date()),
        attachments: attachmentURLs
      };
      await updateDoc(projectRef, {
        history: arrayUnion(newComment),
      });

      const projectSnap = await getDoc(projectRef);
      const updatedProjectData = { id: projectSnap.id, ...projectSnap.data() };
      // console.log(updatedProjectData)
      dispatch({ type: types.ADD_COMMENT_SUCCESS, payload: updatedProjectData });
      message.success('Yorum başarıyla eklendi.');
    } catch (error) {
      dispatch({ type: types.ADD_COMMENT_FAILURE, payload: error.message });
      console.error('Yorum ekleme hatası:', error);
      throw error;
    }
  };
};


export const assignTaskToProject = (projectId, selectedTaskIds, changedBy) => {
  return async (dispatch, getState) => {
    dispatch({ type: types.ASSIGN_TASK_TO_PROJECT_REQUEST });

    try {
      const state = getState();
      const project = state.projects.projects.find((proj) => proj.id === projectId);
      const tasks = state.tasks.tasks;

      if (!project) {
        throw new Error('Proje bulunamadı.');
      }

      const previouslyAssignedTasks = project.assignedTasks || [];
      const tasksToAdd = selectedTaskIds.filter((taskId) => !previouslyAssignedTasks.includes(taskId));
      const tasksToRemove = previouslyAssignedTasks.filter((taskId) => !selectedTaskIds.includes(taskId));

      const projectRef = doc(db, 'projects', projectId);
      const batch = writeBatch(db);

      const updatedAssignedTasks = selectedTaskIds;

      batch.update(projectRef, {
        assignedTasks: updatedAssignedTasks,
        history: arrayUnion({
          changeType: 'taskupdate',
          description: `Görev atamaları güncellendi: ${tasksToAdd
            .map((taskId) => {
              const task = tasks.find((t) => t.id === taskId);
              return task ? task.title : taskId;
            })
            .join(', ')}`,
          timestamp: Timestamp.fromDate(new Date()),
          changedBy,
        }),
        updatedAt: Timestamp.fromDate(new Date()),
      });
      tasksToAdd.forEach((taskId) => {
        const taskRef = doc(db, 'tasks', taskId);
        batch.update(taskRef, {
          projectId,
          updatedAt: Timestamp.fromDate(new Date()),
        });
      });

      tasksToRemove.forEach((taskId) => {
        const taskRef = doc(db, 'tasks', taskId);
        batch.update(taskRef, {
          projectId: null,
          updatedAt: Timestamp.fromDate(new Date()),
        });
      });

      await batch.commit();

      const updatedProjectSnap = await getDoc(projectRef);
      const updatedProjectData = { id: updatedProjectSnap.id, ...updatedProjectSnap.data() };

      const updatedState = getState();
      // console.log('Güncellenen state dispatch öncesi :', updatedState.projects.projects);
      // console.log('updated project data',updatedProjectData)
      dispatch({
        type: types.ASSIGN_TASK_TO_PROJECT_SUCCESS,
        payload: updatedProjectData,
      });

      // console.log('Güncellenen state:', updatedState.projects.projects);

    } catch (error) {
      dispatch({ type: types.ASSIGN_TASK_TO_PROJECT_FAILURE, payload: error.message });
      console.error('Görev güncelleme hatası:', error);
      throw error;
    }
  };
};




