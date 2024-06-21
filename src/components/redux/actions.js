import axios from 'axios';
import CryptoJS from 'crypto-js';

export function getDraws() {
  return (dispatch) => {
    axios
      .get('http://localhost:8000/draw')
      .then((res) => {
        dispatch({
          type: 'GET_DRAWS_FROM_SERVER',
          payload: res.data,
        });
      })
      .catch((err) => err);
  };
}

export const addDrawToHistory = (newDraw) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL_LOCAL}/draw`, newDraw);
    dispatch({
      type: 'ADD_DRAW_TO_HISTORY_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error adding draw to history:', error);
    dispatch({
      type: 'ADD_DRAW_TO_HISTORY_FAILURE',
      payload: error.message,
    });
  }
};

export function deleteDraw(id) {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8000/draw/${id}`)
      .then((res) => {
        dispatch({
          type: 'DELETE_DRAW_FROM_HISTORY',
          payload: { id },
        });
      })
      .catch((err) => err);
  };
}
export const registerUser = (userData, callback) => {
  return async (dispatch) => {
    const encryptedPassword = CryptoJS.AES.encrypt(userData.password, process.env.REACT_APP_JWT_SECRET).toString();
    const encryptedUserData = { ...userData, password: encryptedPassword };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL_LOCAL}/users/register`, encryptedUserData);
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch({
        type: 'REGISTER_USER_SUCCESS',
        payload: response.data,
      });
      callback();
    } catch (error) {
      dispatch({
        type: 'REGISTER_USER_FAIL',
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };
};

export const loginUser = (userData, callback) => {
  return async (dispatch) => {
    const encryptedPassword = CryptoJS.AES.encrypt(userData.password, process.env.REACT_APP_JWT_SECRET).toString();
    const encryptedUserData = { ...userData, password: encryptedPassword };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL_LOCAL}/users/login`, encryptedUserData);
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch({
        type: 'LOGIN_USER_SUCCESS',
        payload: response.data,
      });
      callback();
    } catch (error) {
      dispatch({
        type: 'LOGIN_USER_FAIL',
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch({
      type: 'LOGOUT_USER',
    });
  };
};

export const refreshToken = () => {
  return async (dispatch) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return dispatch({
        type: 'LOGOUT_USER',
      });
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL_LOCAL}/users/refresh-token`, { token: refreshToken });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: 'REFRESH_TOKEN_SUCCESS',
        payload: accessToken,
      });
    } catch (error) {
      dispatch({
        type: 'LOGOUT_USER',
      });
    }
  };
};