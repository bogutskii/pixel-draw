import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import history_del from '../icons/history_del.png';

const ColorHistory = () => {
  const dispatch = useDispatch();
  const historyColor = useSelector((state) => state.auth.historyColor);

  const changeColor = useCallback((color) => {
    dispatch({
      type: 'CHANGE_CURRENT_COLOR',
      payload: { color },
    });
  }, [dispatch]);

  const deleteColorHistory = useCallback(() => {
    dispatch({
      type: 'DELETE_COLOR_HISTORY',
    });
  }, [dispatch]);

  return (
    <div className="container">
      <div className="color-history">
        {historyColor.map((el) => (
          <div
            key={uuidv4()}
            className="pixel-history"
            style={{ background: el }}
            onClick={() => changeColor(el)}
          >
            {' '}
          </div>
        ))}
        <div>
          <button onClick={deleteColorHistory} className="btn-reg warn">
            <img src={history_del} className="img-icon-btn" alt="delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ColorHistory);
