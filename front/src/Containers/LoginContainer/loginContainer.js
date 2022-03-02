import { useDispatch } from 'react-redux';
import { login } from '../../app/features/userAuth/userAuthSlice';
import Login from '../../components/Login/Login';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const getLogin = (credentials) => {
    try {
      dispatch(login(credentials));
    } catch (err) {
      console.log(err);
    }
  };
  return <Login getLogin={getLogin} />;
};

export default LoginContainer;
