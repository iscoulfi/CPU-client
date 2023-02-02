import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { checkIsAuth, reduceMessage } from '../redux/slices/auth/slice';
import { registerUser } from '../redux/slices/auth/asyncActions';

const Registr = () => {
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkIsAuth);
  const navigate = useNavigate();
  const { message } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuth) navigate('/');
    dispatch(reduceMessage());
  }, [isAuth, navigate, message, dispatch]);

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      dispatch(registerUser({ ...data }));
      if (isAuth) setData({ username: '', email: '', password: '' });
    } catch (e) {
      console.log(e);
    }
  }

  function handleInputChange(text: string, name: string) {
    setData({ ...data, [name]: text });
  }

  return (
    <section className="text-center ">
      <div className="card-body py-5 px-md-5">
        <div className=" row d-flex justify-content-center">
          <div className="auth">
            <h2 className="fw-bold mb-5">Sign up</h2>
            <form onSubmit={handleFormSubmit}>
              {/* Username input */}
              <div className="form-outline mb-4">
                <input
                  type="username"
                  className="form-control"
                  value={data.username}
                  onChange={event =>
                    handleInputChange(event.target.value, 'username')
                  }
                />
                <label className="form-label">Username</label>
              </div>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control"
                  value={data.email}
                  onChange={event =>
                    handleInputChange(event.target.value, 'email')
                  }
                />
                <label className="form-label">Email address</label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control"
                  value={data.password}
                  onChange={event =>
                    handleInputChange(event.target.value, 'password')
                  }
                />
                <label className="form-label">Password</label>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign up
              </button>
              <p>
                Already registered{' '}
                <Link to="/login" className="text-decoration-none">
                  sign in?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registr;
