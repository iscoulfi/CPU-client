import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux/store';
import { getMe } from './redux/slices/auth/asyncActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import RingLoader from 'react-spinners/RingLoader';

import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage/MyPage';
import Login from './pages/Login';
import Registr from './pages/Registr';
import AddColl from './pages/MyPage/AddColl';
import Items from './components/MyPage/Items';
import EditColl from './pages/MyPage/EditColl';

function App() {
  const dispatch = useAppDispatch();
  const { message, status } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (message) toast.info(message);
  }, [message]);

  return (
    <>
      {status !== 'loading' ? (
        <BrowserRouter>
          <div className="container">
            <div className="app">
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="personal" element={<MyPage />} />
                  <Route path="personal/addcoll" element={<AddColl />} />
                  <Route path="personal/:id" element={<Items />} />
                  {/* <Route path="personal/:id/edit" element={<EditColl />} /> */}
                  <Route path="login" element={<Login />} />
                  <Route path="registr" element={<Registr />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ToastContainer autoClose={2500} />
            </div>
          </div>
        </BrowserRouter>
      ) : (
        <RingLoader color="#428bff" size={150} className="spinner" />
      )}
    </>
  );
}

export default App;
