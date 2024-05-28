import React from 'react';
import { connect } from 'react-redux';
import history_del from './icons/history_del.png';

const HistoryColor = ({ historyColor, changeColor, deleteColorHistory }) => {
  return (
    <div className="container">
      <div className="color-history">
        {historyColor.map((color, index) => (
          <div
            key={index}
            className="pixel-history"
            style={{ background: color }}
            onClick={() => changeColor(color)}
          >
            {' '}
          </div>
        ))}
        <div>
          <button onClick={deleteColorHistory} className="btn-reg warn">
            <img src={history_del} className="img-icon-btn" alt="delete history" />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  historyColor: state.historyColor,
});

const mapDispatchToProps = (dispatch) => ({
  changeColor: (color) =>
    dispatch({
      type: 'CHANGE_CURRENT_COLOR',
      payload: { color },
    }),
  deleteColorHistory: () =>
    dispatch({
      type: 'DELETE_COLOR_HISTORY',
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryColor);
