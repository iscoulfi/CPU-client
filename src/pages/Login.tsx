import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { checkIsAuth, reduceMessage } from '../redux/slices/auth/slice';
import { loginUser } from '../redux/slices/auth/asyncActions';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(checkIsAuth);
  const { message } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuth) navigate('/');
    dispatch(reduceMessage());
  }, [isAuth, navigate, message, dispatch]);

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data =>
    dispatch(loginUser({ ...data }));

  return (
    <section className="text-center login">
      <div className="card-body py-5 px-md-5">
        <div className=" row d-flex justify-content-center">
          <div className="auth">
            <h2 className="fw-bold mb-5">{t('Sign in')}</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={t('Enter username') as string}
                  {...register('username')}
                  autoComplete="off"
                />
                <Form.Label>{t('Username')}</Form.Label>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder={t('Password') as string}
                  {...register('password')}
                />
                <Form.Label>{t('Password')}</Form.Label>
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-4">
                {t('Sign in')}
              </Button>
              <p>
                {t("Don't have an account?")}{' '}
                <Link to="/registr" className="text-decoration-none">
                  {t('Register here')}
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
