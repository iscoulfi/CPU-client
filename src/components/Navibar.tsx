import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { TbLogout } from 'react-icons/tb';

const Navibar = () => {
  //fix
  const isAuth = true;

  return (
    <Navbar className="navibar rounded-top" bg="light" expand="md" sticky="top">
      <Container className="justify-content-between ">
        <Link to="." className="d-flex align-items-center ">
          <div>
            <img
              src="./img/logo.svg"
              width="35"
              height="35"
              className="d-inline-block  my-1"
              alt="logo"
            />
          </div>
          <div className=" d-flex flex-column">
            <h1>Home</h1>
            <p>Your personal collections</p>
          </div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form.Control
            type="search"
            placeholder="Search"
            className="search my-1 ms-md-auto"
            aria-label="Search"
          />

          {isAuth ? (
            <TbLogout className="logout my-1" />
          ) : (
            <>
              <Button variant="outline-primary">Sign in</Button>
              <Button variant="outline-primary" className="ms-3">
                Sign up
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navibar;
