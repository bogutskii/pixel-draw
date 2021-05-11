import axios from 'axios';

export function getDraws() {
  return (dispatch) => {
    axios
      .get('http://localhost:5000/draw')
      .then((res) => {
        dispatch({
          type: 'GET_DRAWS_FROM_SERVER',
          payload: res.data,
        });
      })
      .catch((err) => err);
  };
}
