import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { checkIsAuth, reduceMessage } from '../redux/slices/auth/slice';
import { registerUser } from '../redux/slices/auth/asyncActions';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Registr = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(checkIsAuth);
  const { message } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuth) navigate('/');
    dispatch(reduceMessage());
  }, [isAuth, navigate, message, dispatch]);

  const validation = ({ username, email, password }: Inputs) => {
    if (username.length < 3) {
      return toast.error('Username must be at least 3 characters long');
    }
    if (email.length === 0) {
      return toast.error('Enter e-mail');
    }
    if (password.length < 5) {
      return toast.error('Password must be at least 5 characters long');
    }
    return;
  };

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    if (validation(data)) return;
    dispatch(registerUser({ ...data }));
  };

  return (
    <section className="text-center ">
      <div className="card-body py-5 px-md-5">
        <div className=" row d-flex justify-content-center">
          <div className="auth">
            <h2 className="fw-bold mb-5">Sign up</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  {...register('username')}
                  autoComplete="off"
                />
                <Form.Label>Username</Form.Label>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register('email')}
                  autoComplete="off"
                />
                <Form.Label>Email address</Form.Label>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register('password')}
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-4">
                Sign up
              </Button>
              <p>
                Already registered{' '}
                <Link to="/login" className="text-decoration-none">
                  sign in?
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
