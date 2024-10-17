import { db } from '../../firebaseConfig';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  arrayUnion, 
  Timestamp 
} from 'firebase/firestore';
import { toast } from 'react-toastify';

export const SET_TASKS = 'SET_TASKS';
export const SET_TASKS_ERROR = 'SET_TASKS_ERROR';
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_ERROR = 'ADD_TASK_ERROR';
export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';
export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_ERROR = 'DELETE_TASK_ERROR';
export const ASSIGN_TASK = 'ASSIGN_TASK';
export const ASSIGN_TASK_ERROR = 'ASSIGN_TASK_ERROR';
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export const setTasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks,
});

export const setTasksError = (error) => ({
  type: SET_TASKS_ERROR,
  payload: error,
});

export const addTaskAction = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const addTaskError = (error) => ({
  type: ADD_TASK_ERROR,
  payload: error,
});

export const updateTaskAction = (task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const updateTaskError = (error) => ({
  type: UPDATE_TASK_ERROR,
  payload: error,
});

export const deleteTaskAction = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const deleteTaskError = (error) => ({
  type: DELETE_TASK_ERROR,
  payload: error,
});

export const assignTaskAction = (taskId, assignees) => ({
  type: ASSIGN_TASK,
  payload: { taskId, assignees },
});

export const assignTaskError = (error) => ({
  type: ASSIGN_TASK_ERROR,
  payload: error,
});

export const addCommentAction = (taskId, comment) => ({
  type: ADD_COMMENT,
  payload: { taskId, comment },
});

export const addCommentError = (error) => ({
  type: ADD_COMMENT_ERROR,
  payload: error,
});


export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const tasks = [];
      querySnapshot.forEach((docSnap) => {
        tasks.push({ id: docSnap.id, ...docSnap.data() });
      });
      dispatch(setTasks(tasks));
    } catch (error) {
      console.error('Görevleri alırken hata:', error);
      dispatch(setTasksError(error.message));
      toast.error('Görevleri alırken bir hata oluştu.');
    }
  };
};

export const addTask = (task) => {
  return async (dispatch, getState) => {
    try {
      const currentUser = getState().users.currentUser;
      if (!currentUser) {
        throw new Error('Kullanıcı bilgisi bulunamadı.');
      }

      const newTask = {
        title: task.title,
        description: task.description || '',
        completed: false,
        assignedTo: task.assignedTo || [],
        createdUser: currentUser.id,
        createdAt: Timestamp.fromDate(new Date()),
        history: [
          {
            changeType: 'comment', 
            description: `Görev "${task.title}" oluşturuldu.`,
            changedBy: currentUser.id,
            timestamp: Timestamp.fromDate(new Date()),
          },
        ],
      };

      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      const newTaskWithId = { id: docRef.id, ...newTask };
      dispatch(addTaskAction(newTaskWithId));
      toast.success('Görev başarıyla eklendi!');
    } catch (error) {
      console.error('Görev eklerken hata:', error);
      dispatch(addTaskError(error.message));
      toast.error('Görev eklenirken bir hata oluştu.');
    }
  };
};

export const updateTask = (updatedTask) => {
  return async (dispatch) => {
    try {
      const taskDoc = doc(db, 'tasks', updatedTask.id);
      await updateDoc(taskDoc, updatedTask);
      dispatch(updateTaskAction(updatedTask));
      toast.success('Görev başarıyla güncellendi!');
    } catch (error) {
      console.error('Görevi güncellerken hata:', error);
      dispatch(updateTaskError(error.message));
      toast.error('Görev güncellenirken bir hata oluştu.');
    }
  };
};

export const deleteTask = (taskId) => {
  return async (dispatch) => {
    try {
      const taskDoc = doc(db, 'tasks', taskId);
      await deleteDoc(taskDoc);
      dispatch(deleteTaskAction(taskId));
      toast.success('Görev başarıyla silindi!');
    } catch (error) {
      console.error('Görevi silerken hata:', error);
      dispatch(deleteTaskError(error.message));
      toast.error('Görev silinirken bir hata oluştu.');
    }
  };
};

export const assignTask = (taskId, assignees) => {
  return async (dispatch) => {
    try {
      const taskDoc = doc(db, 'tasks', taskId);
      await updateDoc(taskDoc, { assignedTo: assignees });
      dispatch(assignTaskAction(taskId, assignees));
      toast.success('Görev başarıyla atandı!');
    } catch (error) {
      console.error('Görevi atarken hata:', error);
      dispatch(assignTaskError(error.message));
      toast.error('Görev atanırken bir hata oluştu.');
    }
  };
};

export const addComment = (taskId, commentText) => {
  return async (dispatch, getState) => {
    try {
      const currentUser = getState().users.currentUser;
      if (!currentUser) {
        throw new Error('Kullanıcı bilgisi bulunamadı.');
      }

      const comment = {
        changeType: 'comment', 
        description: commentText,
        changedBy: currentUser.id,
        timestamp: Timestamp.fromDate(new Date()),
      };

      const taskDoc = doc(db, 'tasks', taskId);
      await updateDoc(taskDoc, {
        history: arrayUnion(comment),
      });

      dispatch(addCommentAction(taskId, comment));
      toast.success('Yorum başarıyla eklendi!');
    } catch (error) {
      console.error('Yorum eklerken hata:', error);
      dispatch(addCommentError(error.message));
      toast.error('Yorum eklenirken bir hata oluştu.');
    }
  };
};
