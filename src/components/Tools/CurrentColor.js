import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { connect } from 'react-redux';

const CurrentColor = ({ currentColor, changeColor }) => (
  <div className="custom-pointers">
    <HexColorPicker
      className="mg-0-a"
      color={currentColor}
      onChange={changeColor}
    />
  </div>
);

const mapStateToProps = (state) => ({
  currentColor: state.currentColor,
});

const mapDispatchToProps = (dispatch) => ({
  changeColor: (color) =>
    dispatch({
      type: 'CHANGE_CURRENT_COLOR',
      payload: { color },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentColor);