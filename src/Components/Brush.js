import React from 'react';
import { connect } from 'react-redux';
import fill from './icons/fill.png';
import random from './icons/random.jpeg';
import colorpicker from './icons/colorpicker.png';

const Brush = (props) => {
  const { changeBrush, fieldRandomBrush, brush } = props;
  return (
    <div className="brush-block">
      <button
        className={`btn-reg ${brush === 'dot' ? 'btn-pushed' : ''}`}
        onClick={() => changeBrush('dot')}
      >
        ▣
      </button>
      <button
        className={`btn-reg ${brush === 'horizontal' ? 'btn-pushed' : ''}`}
        onClick={() => changeBrush('horizontal')}
      >
        ↔
      </button>
      <button
        className={`btn-reg ${brush === 'vertical' ? 'btn-pushed' : ''}`}
        onClick={() => changeBrush('vertical')}
      >
        ↕
      </button>
      <button
        className={`btn-reg ${brush === 'cross' ? 'btn-pushed' : ''}`}
        onClick={() => changeBrush('cross')}
      >
        ✚
      </button>
      <button
        className={`btn-reg ${brush === 'fill' ? 'btn-pushed' : ''}`}
        onClick={() => changeBrush('fill')}
      >
        <img src={fill} className="img-icon-btn" />
      </button>
      <button
        className={`btn-reg ${brush === 'mirrorH' ? 'btn-pushed' : ''}`}
        onClick={() => changeBrush('mirrorH')}
      >
        ═
      </button>
      <button
        className={`btn-reg ${brush === 'mirrorV' ? 'btn-pushed' : ''}`}
        onClick={() => changeBrush('mirrorV')}
      >
        ||
      </button>
      <button
        className={`btn-reg ${brush === 'color-picker' ? 'btn-pushed' : ''}`}
        onClick={() => changeBrush('color-picker')}
      >
        <img src={colorpicker} className="img-icon-btn" />
      </button>
      <button className="btn-reg" onClick={fieldRandomBrush}>
        <img src={random} className="img-icon-btn" />
      </button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  brush: state.brush,
});

const mapDispatchToProps = (dispatch) => ({
  changeBrush: (brush) =>
    dispatch({
      type: 'CHANGE_BRUSH',
      payload: {
        brush,
      },
    }),
  fieldRandomBrush: () =>
    dispatch({
      type: 'FILL_RANDOM_BRUSH',
      payload: {},
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Brush);
//fieldRandomBrush('random')
// const mapStateToProps = (state) => ({
//   brush: state.brush,
// });
//

//   fieldRandomBrush: () =>
//     dispatch({
//       type: 'FILL_RANDOM_BRUSH',
//       payload: {},
//     }),
