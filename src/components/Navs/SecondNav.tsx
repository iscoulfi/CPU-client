import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { checkIsAdmin, checkIsAuth } from '../../redux/slices/auth/slice';
import { useTranslation } from 'react-i18next';
import Nav from 'react-bootstrap/Nav';

function SecondNav() {
  const { t } = useTranslation();
  const { user } = useAppSelector(state => state.auth);
  const isAuth = useAppSelector(checkIsAuth);
  const isAdmin = useAppSelector(checkIsAdmin);
  return (
    <Nav className="border-top p-2 gap-3">
      <Nav.Item>
        <NavLink to="/">{t('Main')}</NavLink>
      </Nav.Item>
      {isAuth && (
        <Nav.Item>
          <NavLink to={`${user?._id}`}>{t('My Page')}</NavLink>
        </Nav.Item>
      )}
      {isAdmin && isAuth && (
        <Nav.Item>
          <NavLink to="admin">{t('Admin')}</NavLink>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default SecondNav;
