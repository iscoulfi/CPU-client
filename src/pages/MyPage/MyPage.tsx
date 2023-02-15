import MyColl from '../../components/MyPage/MyColl';
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { getMyCollections } from '../../redux/slices/collection/asyncActions';
import { checkIsAuth } from '../../redux/slices/auth/slice';

const MyPage = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkIsAuth);

  useEffect(() => {
    dispatch(getMyCollections());
  }, [dispatch]);

  if (!window.localStorage.getItem('token') || !isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="text-center">
        <Link to="/personal/addcoll">
          <Button variant="outline-primary" className="my-3">
            Add New Collection
          </Button>
        </Link>
      </div>

      <MyColl />
    </div>
  );
};

export default MyPage;
