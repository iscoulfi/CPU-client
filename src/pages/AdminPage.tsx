import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { getAll, removeUser } from '../redux/slices/admin/asyncActions';
import { logout } from '../redux/slices/auth/slice';
import { useNavigate } from 'react-router-dom';

import AdminTable from '../components/AdminPage/AdminTable';
import Toolbar from '../components/AdminPage/Toolbar';
import Button from 'react-bootstrap/Button';

const AdminPage = () => {
  const [checkedUserId, setCheckedUserId] = useState('');
  const [activeCheckbox, setActiveCheckbox] = useState<null | number>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resetCheckbox = () => {
    setActiveCheckbox(null);
    setCheckedUserId('');
  };

  const block = (statusUser: string) => {};

  const cleaner = () => {
    dispatch(removeUser(checkedUserId));
    logoutUser();
    resetCheckbox();
  };

  const logoutUser = () => {
    if (checkedUserId === window.localStorage.id) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <div>
      <div className="text-center mb-2">
        <h2 className="fw-bold mt-3 fs-4">Users</h2>
        <div className="text-center my-3">
          <Button variant="outline-primary" className=" me-2">
            To page
          </Button>
          <Button variant="outline-primary">Admin</Button>
        </div>
        <Toolbar cleaner={cleaner} block={block} />
      </div>
      <AdminTable
        setCheckedUserId={setCheckedUserId}
        activeCheckbox={activeCheckbox}
        setActiveCheckbox={setActiveCheckbox}
      />
    </div>
  );
};

export default AdminPage;
