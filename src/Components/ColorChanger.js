import React, { useState } from 'react';
import { connect } from 'react-redux';

const ColorChanger = (props) => {
  // const [switchColor, currentColor] = props;
  // const [color, setColor] = useState(currentColor);
  //const [toColor, setToColor]= useState(currentColor)

  return (
    <div className="mg-10">
      {/*<input type="color" onChange={(e) => setColor(e.target.value)} />*/}
      <span>=></span>
      {/*<input type="color" onChange={(e) => props.switchColor(color, e.target.value)} />*/}
      <br />
      {/*<button>apply</button>*/}
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
