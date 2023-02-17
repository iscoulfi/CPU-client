import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbLogout } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';
import { checkIsAuth, logout } from '../../redux/slices/auth/slice';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { DebouncedFunc } from 'lodash';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LangSwitch from '../UI/LangSwitch';
import SecondNav from './SecondNav';

type NavibarProps = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  updateSearchItems: DebouncedFunc<(str: string) => Promise<void>>;
};

const Navibar = ({
  searchValue,
  setSearchValue,
  updateSearchItems,
}: NavibarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkIsAuth);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const searchPost = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    pathname !== '/search' && navigate('/search');
    updateSearchItems(event.target.value);
  };

  useEffect(() => {
    pathname !== '/search' && setSearchValue('');
  }, [pathname, setSearchValue]);

  return (
    <>
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
                  navigate('/');
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
      <SecondNav />
    </>
  );
};

export default Navibar;
