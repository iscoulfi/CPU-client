import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux/store';
import { getMe } from './redux/slices/auth/asyncActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

import RingLoader from 'react-spinners/RingLoader';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage/MyPage';
import Login from './pages/Login';
import Registr from './pages/Registr';
import AddColl from './pages/MyPage/AddColl';
import Items from './pages/Items/Items';
import EditColl from './pages/MyPage/EditColl';
import AddItem from './pages/Items/AddItem';
import Item from './pages/Items/Item';
import SearchItem from './pages/SearchItem';
import AdminPage from './pages/AdminPage';
import { logout } from './redux/slices/auth/slice';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, message, status } = useAppSelector(state => state.auth);
  const socket = io(process.env.REACT_APP_SERVER as string);

  useEffect(() => {
    if (user) {
      socket.emit('add-user', user._id);
    }
  }, [user, socket]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (message) toast.info(message);
  }, [message]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/');
  }, [dispatch, navigate]);

  useEffect(() => {
    if (user) {
      user.statusUser === 'blocked' && logoutUser();
    }
  }, [user, logoutUser]);

  useEffect(() => {
    if (socket) {
      socket.on('logout', () => {
        logoutUser();
      });
    }
  }, [socket, logoutUser]);

  return (
    <>
      {status !== 'loading' ? (
        <div className="container">
          <div className="app">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="search" element={<SearchItem />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path=":userId" element={<MyPage />} />
                <Route path=":userId/addcoll" element={<AddColl />} />
                <Route path="personal/:collId" element={<Items />} />
                <Route path="personal/:collId/edit" element={<EditColl />} />
                <Route path="personal/:collId/addItem" element={<AddItem />} />
                <Route
                  path="personal/:collId/:itemId/edit"
                  element={<AddItem />}
                />
                <Route path="personal/:collId/:itemId" element={<Item />} />
                <Route path="login" element={<Login />} />
                <Route path="registr" element={<Registr />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer autoClose={2500} />
          </div>
        </div>
      ) : (
        <RingLoader color="#428bff" size={150} className="spinner" />
      )}
    </>
  );
}

export default App;
