import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { useAppSelector } from '../../redux/store';

function SecondNav() {
  const { user } = useAppSelector(state => state.auth);
  return (
    <Nav className="border-top p-2 gap-3">
      <Nav.Item>
        <NavLink to="/">Main</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to={`${user?._id}`}>My page</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="admin">Admin</NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default SecondNav;
