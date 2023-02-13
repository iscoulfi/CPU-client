import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbLogout } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../theme/ThemeContext';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { checkIsAuth, logout } from '../redux/slices/auth/slice';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { ItemPreview } from '../layouts/MainLayout';
import axios from '../utils/axios';
import debounce from 'lodash.debounce';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LangSwitch from './UI/LangSwitch';

type NavibarProps = {
  setItems: Dispatch<SetStateAction<ItemPreview[] | []>>;
};

const Navibar = ({ setItems }: NavibarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkIsAuth);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('');

  const updateSearchItems = useCallback(
    debounce(async (str: string) => {
      try {
        const { data } = await axios.get(`/items?search=${str}`);
        setItems(data);
      } catch (e) {
        console.log(e);
      }
    }, 200),
    []
  );

  const searchPost = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    pathname !== '/search' && navigate('/search');
    updateSearchItems(event.target.value);
  };

  useEffect(() => {
    pathname !== '/search' && setSearchValue('');
  }, [pathname]);

  return (
    <Navbar className="navibar rounded-top" expand="md" sticky="top">
      <Container className="justify-content-between ">
        <Link to="." className="d-flex align-items-center ">
          <div>
            <img
              src="../../../img/logo.svg"
              width="35"
              height="35"
              className="d-inline-block  my-1"
              alt="logo"
            />
          </div>
          <div className="d-flex flex-column title">
            <h1>{t('Home')}</h1>
            <p>{t('Your personal collections')}</p>
          </div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form.Control
            type="search"
            placeholder={t('Search') as string}
            className="search my-1 ms-md-auto"
            aria-label="Search"
            value={searchValue}
            onChange={searchPost}
          />
          <LangSwitch />

          <Form.Check
            type="switch"
            id="switch"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />

          {isAuth ? (
            <TbLogout
              className="logout my-1"
              onClick={() => {
                dispatch(logout());
                ['token', 'role'].forEach(item =>
                  localStorage.removeItem(item)
                );
              }}
            />
          ) : (
            <>
              <Button
                variant="outline-primary"
                onClick={() => navigate('/login')}
              >
                {t('Sign in')}
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => navigate('/registr')}
                className="ms-2"
              >
                {t('Sign up')}
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navibar;
