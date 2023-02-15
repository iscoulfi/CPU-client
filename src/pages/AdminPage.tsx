import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux/store';
import {
  getAll,
  removeUser,
  blockUser,
} from '../redux/slices/admin/asyncActions';
import { io } from 'socket.io-client';

import AdminTable from '../components/AdminPage/AdminTable';
import Toolbar from '../components/AdminPage/Toolbar';
import Button from 'react-bootstrap/Button';

const AdminPage = () => {
  const [checkedUserId, setCheckedUserId] = useState('');
  const [activeCheckbox, setActiveCheckbox] = useState<null | number>(null);
  const dispatch = useAppDispatch();
  const socket = io(process.env.REACT_APP_SERVER as string);

  const resetCheckbox = () => {
    setActiveCheckbox(null);
    setCheckedUserId('');
  };

  const block = (statusUser: string) => {
    dispatch(blockUser({ statusUser, userId: checkedUserId }));
    socket.emit('logout-user', checkedUserId);
    resetCheckbox();
  };

  const cleaner = () => {
    dispatch(removeUser(checkedUserId));
    socket.emit('logout-user', checkedUserId);
    resetCheckbox();
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
