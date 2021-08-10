import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import history_del from './icons/history_del.png';

const HistoryColor = (props) => {
  const { historyColor, changeColor, deleteColorHistory } = props;

  return (
    <div className="container">
      <div className="color-history">
        {historyColor.map((el, i) => (
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
            <img src={history_del} className="img-icon-btn" />
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
      payload: {
        color,
      },
    }),
  deleteColorHistory: (color) =>
    dispatch({
      type: 'DELETE_COLOR_HISTORY',
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryColor);
