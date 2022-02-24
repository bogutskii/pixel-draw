import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { connect } from 'react-redux';

const CurrentColor = (props) => {
  return (
    <div className="custom-pointers">
      <HexColorPicker
        className="mg-0-a"
        color={props.currentColor}
        onChange={(color) => props.changeColor(color)}
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
