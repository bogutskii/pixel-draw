import React from 'react';
import { connect } from 'react-redux';

const ColorChanger = () => {
  return (
    <div className="mg-10">
      <br />
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentColor: state.currentColor,
});

const mapDispatchToProps = (dispatch) => ({
  switchColor: (color, toColor) =>
    dispatch({
      type: 'SWITCH_COLOR',
      payload: {
        color,
        toColor,
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorChanger);
