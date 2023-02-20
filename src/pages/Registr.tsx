import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { checkIsAuth, reduceMessage } from '../redux/slices/auth/slice';
import { registerUser } from '../redux/slices/auth/asyncActions';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Registr = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(checkIsAuth);
  const { message } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuth) navigate('/');
    dispatch(reduceMessage());
  }, [isAuth, navigate, message, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(registerUser({ ...data }));
  };

  return (
    <section className="text-center ">
      <div className="card-body py-5 px-md-5">
        <div className=" row d-flex justify-content-center">
          <div className="auth">
            <h2 className="fw-bold mb-5">{t('Sign up')}</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={t('Enter username') as string}
                  {...register('username', { required: true, minLength: 3 })}
                  autoComplete="off"
                  isInvalid={!!errors.username}
                />
                {errors.username ? (
                  <span style={{ color: 'red' }}>
                    {t('Username must be at least 3 characters long')}
                  </span>
                ) : (
                  <span>{t('Username')}</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder={t('Enter e-mail') as string}
                  {...register('email', {
                    required: true,
                  })}
                  autoComplete="off"
                  isInvalid={!!errors.email}
                />
                {errors.email ? (
                  <span style={{ color: 'red' }}> {t('Enter e-mail')}</span>
                ) : (
                  <span>E-mail</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder={t('Password') as string}
                  {...register('password', { required: true, minLength: 5 })}
                  isInvalid={!!errors.password}
                />
                {errors.password ? (
                  <span style={{ color: 'red' }}>
                    {t('Password must be at least 5 characters long')}
                  </span>
                ) : (
                  <span>{t('Password')}</span>
                )}
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-4">
                {t('Sign up')}
              </Button>
              <p>
                {t('Already registered')}{' '}
                <Link to="/login" className="text-decoration-none">
                  {t('sign in?')}
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registr;
