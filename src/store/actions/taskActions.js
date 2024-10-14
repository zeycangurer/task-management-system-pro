
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const SET_TASKS = 'SET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const tasks = [];
      querySnapshot.forEach((docSnap) => {
        tasks.push({ id: docSnap.id, ...docSnap.data() });
      });
      dispatch({ type: SET_TASKS, payload: tasks });
    } catch (error) {
      console.error('Görevleri alırken hata:', error);
    }
  };
};

export const addTask = (task) => {
  return async (dispatch) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), task);
      const newTask = {
        id: docRef.id,
        ...task,
        createdAt: task.createdAt,
      };
      dispatch({ type: ADD_TASK, payload: newTask });
      toast.success('Görev başarıyla eklendi!');
    } catch (error) {
      console.error('Görev eklerken hata:', error);
      toast.error('Görev eklenirken bir hata oluştu.');
    }
  };
};

export const updateTask = (updatedTask) => {
  return async (dispatch) => {
    try {
      const taskDoc = doc(db, 'tasks', updatedTask.id);
      await updateDoc(taskDoc, updatedTask);
      dispatch({ type: UPDATE_TASK, payload: updatedTask });
    } catch (error) {
      console.error('Görevi güncellerken hata:', error);
    }
  };
};

export const deleteTask = (taskId) => {
  return async (dispatch) => {
    try {
      const taskDoc = doc(db, 'tasks', taskId);
      await deleteDoc(taskDoc);
      dispatch({ type: DELETE_TASK, payload: taskId });
    } catch (error) {
      console.error('Görevi silerken hata:', error);
    }
  };
};

export const assignTask = (taskId, assignee) => {
  return async (dispatch) => {
    try {
      const taskDoc = doc(db, 'tasks', taskId);
      await updateDoc(taskDoc, { assignedTo: assignee });
      dispatch({ type: UPDATE_TASK, payload: { id: taskId, assignedTo: assignee } });
    } catch (error) {
      console.error('Görevi atarken hata:', error);
    }
  };
};

export const addComment = (taskId, comment) => {
  return async (dispatch, getState) => {
    try {
      const task = getState().tasks.tasks.find((t) => t.id === taskId);
      const updatedTask = {
        ...task,
        history: [
          ...(task.history || []),
          { description: comment, timestamp: new Date().toLocaleString() },
        ],
      };
      const taskDoc = doc(db, 'tasks', taskId);
      await updateDoc(taskDoc, { history: updatedTask.history });
      dispatch({ type: UPDATE_TASK, payload: updatedTask });
    } catch (error) {
      console.error('Yorum eklerken hata:', error);
    }
  };
};

