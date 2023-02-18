import MyColl from '../../components/MyPage/MyColl';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect, useState } from 'react';
import { getMyCollections } from '../../redux/slices/collection/asyncActions';
import { checkIsAdmin, checkIsAuth } from '../../redux/slices/auth/slice';
import axios from '../../utils/axios';
import { UsersData } from '../../redux/slices/admin/types';

const MyPage = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkIsAuth);
  const isAdmin = useAppSelector(checkIsAdmin);
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const { userId } = useParams();
  const [owner, setOwner] = useState<null | UsersData>(null);

  useEffect(() => {
    (async () => {
      if (!isAdmin) return;
      try {
        const { data } = await axios.get(`/auth/profile/${userId}`);
        if (!data) {
          navigate('/');
          return;
        }
        setOwner(data.user);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [dispatch, userId, isAdmin, navigate]);

  useEffect(() => {
    dispatch(getMyCollections(userId as string));
  }, [dispatch, userId]);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/login" />;
  }

  if (user && user._id !== userId && !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="fs-4 my-3">
          {isAdmin ? owner?.username : user?.username}
        </h1>
        <Button
          variant="outline-primary"
          className="mb-3"
          onClick={() => navigate(`/${userId}/addcoll`)}
        >
          Add New Collection
        </Button>
      </div>
      <MyColl />
    </div>
  );
};

export default MyPage;
