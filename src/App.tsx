import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux/store';
import { getMe } from './redux/slices/auth/asyncActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import PersonalPage from './pages/PersonalPage';
import Login from './pages/Login';
import Registr from './pages/Registr';

function App() {
  const dispatch = useAppDispatch();
  const message = useAppSelector(state => state.auth.message);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (message) toast(message);
  }, [message]);

  return (
    <BrowserRouter>
      <div className="container">
        <div className="app">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="personal" element={<PersonalPage />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="registr" element={<Registr />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer autoClose={2500} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

//tes
//wdc
