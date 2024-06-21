import React, { useEffect } from 'react';
import './styles.css';
import Field from './components/Field/Field.js';
import { connect, useDispatch } from 'react-redux';
import { Header } from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import { refreshToken } from './components/redux/actions';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshToken());
    }, 30 * 60 * 1000); // Каждые 30 минут

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Header username={props.username} />
        <Routes>
          <Route path="/" element={<Field />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} /> {/* Добавьте маршрут профиля */}
        </Routes>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  username: state.username,
});

export default connect(mapStateToProps)(App);
