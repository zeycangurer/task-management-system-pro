import { db } from '../../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, arrayUnion, arrayRemove, Timestamp, getDocs, writeBatch, getDoc } from 'firebase/firestore';
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
        assignedUsers: projectData.assignedUsers || [],
        assignedTasks: projectData.assignedTasks || [],
        startDate: Timestamp.fromDate(projectData.startDate),
        endDate: Timestamp.fromDate(projectData.endDate),
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };

      const docRef = await addDoc(collection(db, 'projects'), data);
      const newProject = { id: docRef.id, ...data };
      dispatch({ type: types.ADD_PROJECT_SUCCESS, payload: newProject });
    } catch (error) {
      dispatch({ type: types.ADD_PROJECT_FAILURE, payload: error.message });
    }
  };
};



export const updateProject = (projectId, updatedData) => {
  return async (dispatch, getState) => {
    dispatch({ type: types.UPDATE_PROJECT_REQUEST });
    try {
      const projectRef = doc(db, 'projects', projectId);
      const projectSnap = await getDoc(projectRef);
      if (!projectSnap.exists()) {
        throw new Error('Proje bulunamadı.');
      }

      const projectData = projectSnap.data();

      const oldAssignedTasks = projectData.assignedTasks || [];
      const newAssignedTasks = updatedData.assignedTasks || [];

      
      const data = {
        ...updatedData,
        assignedUsers: updatedData.assignedUsers || [],
        assignedTasks: newAssignedTasks,
        startDate: updatedData.startDate ? Timestamp.fromDate(updatedData.startDate) : null,
        endDate: updatedData.endDate ? Timestamp.fromDate(updatedData.endDate) : null,
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

     
      if (addedTasks.length > 0  || removedTasks.length > 0 ) {
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

      await batch.commit();

      const updatedProjectSnap = await getDoc(projectRef);
      const updatedProjectData = { id: updatedProjectSnap.id, ...updatedProjectSnap.data() };

      dispatch({
        type: types.UPDATE_PROJECT_SUCCESS,
        payload: updatedProjectData,
      });
      message.success('Proje başarıyla güncellendi.');
    } catch (error) {
      dispatch({ type: types.UPDATE_PROJECT_FAILURE, payload: error.message });
      message.error('Proje güncellenirken bir hata oluştu.');
    }
  };
};



export const deleteProject = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: types.DELETE_PROJECT_REQUEST });
    try {
      const projectRef = doc(db, 'projects', projectId);
      await deleteDoc(projectRef);
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
            description: `Proje atandı: ${addedNames}`,
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

