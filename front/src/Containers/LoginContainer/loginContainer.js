// import dependencies
import { useDispatch } from 'react-redux';
// function
import { login } from '../../app/features/userAuth/userAuthSlice';
// components
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
