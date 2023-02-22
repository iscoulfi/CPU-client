import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect, useState } from 'react';
import { getMyCollections } from '../../redux/slices/collection/asyncActions';
import { checkIsAdmin, checkIsAuth } from '../../redux/slices/auth/slice';
import { UsersData } from '../../redux/slices/admin/types';
import { useTranslation } from 'react-i18next';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from '../../utils/axios';
import MyColl from '../../components/MyPage/MyColl';
import Button from 'react-bootstrap/Button';

const MyPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkIsAuth);
  const isAdmin = useAppSelector(checkIsAdmin);
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const { status } = useAppSelector(state => state.collection);
  const admin = useAppSelector(state => state.admin);
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
    <div className="my-page">
      {status === 'loading' || admin.status === 'loading' ? (
        <div className="text-center pt-5">
          <ClipLoader color="#428bff" className="loader" />
        </div>
      ) : (
        <>
          <div className="text-center">
            <h1 className="fs-4 my-3 fw-bold">
              {isAdmin ? owner?.username : user?.username}
            </h1>
            <Button
              variant="outline-primary"
              className="mb-3"
              onClick={() => navigate(`/${userId}/addcoll`)}
            >
              {t('Add New Collection')}
            </Button>{' '}
          </div>
          <MyColl />
        </>
      )}
    </div>
  );
};

export default MyPage;
