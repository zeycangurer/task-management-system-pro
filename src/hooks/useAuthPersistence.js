import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../store/actions/authActions';

function useAuthPersistence() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);


  useEffect(() => {
    // console.log("Redux Kullanıcı:", user);

    dispatch(restoreUser()); 
  }, [dispatch]);
}

export default useAuthPersistence;
