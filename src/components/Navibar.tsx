import { Link } from 'react-router-dom';
import { TbLogout } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LangSwitch from './UI/LangSwitch';

const Navibar = () => {
  //fix
  const isAuth = true;
  const { t } = useTranslation();
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
          />
          <LangSwitch />

          {isAuth ? (
            <TbLogout className="logout my-1" />
          ) : (
            <>
              <Button variant="outline-primary">{t('Sign in')}</Button>
              <Button variant="outline-primary" className="ms-2">
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
