import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { useAppSelector } from '../../redux/store';
import { checkIsAdmin, checkIsAuth } from '../../redux/slices/auth/slice';

function SecondNav() {
  const { user } = useAppSelector(state => state.auth);
  const isAuth = useAppSelector(checkIsAuth);
  const isAdmin = useAppSelector(checkIsAdmin);
  return (
    <Nav className="border-top p-2 gap-3">
      <Nav.Item>
        <NavLink to="/">Main</NavLink>
      </Nav.Item>
      {isAuth && (
        <Nav.Item>
          <NavLink to={`${user?._id}`}>My page</NavLink>
        </Nav.Item>
      )}
      {isAdmin && isAuth && (
        <Nav.Item>
          <NavLink to="admin">Admin</NavLink>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default SecondNav;
