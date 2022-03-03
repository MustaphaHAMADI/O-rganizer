// import dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// import components
import App from './components/App/App';

// import store
import { store } from './app/store';

// styles
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <Provider store={store}>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
