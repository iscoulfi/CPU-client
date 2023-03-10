import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  getAll,
  removeUser,
  updateUser,
} from '../redux/slices/admin/asyncActions';
import { Navigate, useNavigate } from 'react-router';
import { checkIsAdmin } from '../redux/slices/auth/slice';
import { useTranslation } from 'react-i18next';

import AdminTable from '../components/AdminPage/AdminTable';
import Toolbar from '../components/AdminPage/Toolbar';
import AppointButtons from '../components/AdminPage/AppointButtons';
import Button from 'react-bootstrap/Button';

const AdminPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checkedUserId, setCheckedUserId] = useState('');
  const [activeCheckbox, setActiveCheckbox] = useState<null | number>(null);
  const isAdmin = useAppSelector(checkIsAdmin);
  const { socket } = useAppSelector(state => state.socket);

  const resetCheckbox = () => {
    setActiveCheckbox(null);
    setCheckedUserId('');
  };

  const block = (statusUser: string) => {
    dispatch(updateUser({ prop: statusUser, userId: checkedUserId }));
    socket.emit('logout-user', checkedUserId);
    resetCheckbox();
  };

  const cleaner = () => {
    dispatch(removeUser(checkedUserId));
    socket.emit('logout-user', checkedUserId);
    resetCheckbox();
  };

  const appointAdmin = (roles: string[]) => {
    dispatch(updateUser({ prop: roles, userId: checkedUserId }));
    socket.emit('change-role', checkedUserId);
    resetCheckbox();
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  if (window.localStorage.getItem('role') !== 'admin' && !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="text-center mb-2">
        <h2 className="fw-bold mt-3 fs-4">{t('Users')}</h2>
        <div className="d-flex flex-column align-items-center">
          <div>
            <Button
              variant="outline-primary"
              className="mb-3 me-2"
              disabled={!checkedUserId}
              onClick={() => {
                navigate(`/${checkedUserId}`);
              }}
            >
              {t('To page')}
            </Button>

            <AppointButtons
              appointAdmin={appointAdmin}
              checkedUserId={checkedUserId}
            />
          </div>

          <Toolbar
            cleaner={cleaner}
            block={block}
            checkedUserId={checkedUserId}
          />
        </div>
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
