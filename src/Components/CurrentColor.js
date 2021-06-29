import React from 'react';
import { connect } from 'react-redux';

const CurrentColor = (props) => {
  return (
    <div>
      <input
        type="color"
        value={props.currentColor}
        onChange={(e) => props.changeColor(e.target.value)}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentColor: state.currentColor,
});

const mapDispatchToProps = (dispatch) => ({
  changeColor: (color) =>
    dispatch({
      type: 'CHANGE_CURRENT_COLOR',
      payload: {
        color,
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentColor);
