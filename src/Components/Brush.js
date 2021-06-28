import React from 'react';
import { connect } from 'react-redux';

const Brush = (props) => {
  const { changeBrush, fieldRandomBrush } = props;
  return (
    <div className="brush-block">
      <button className="btn-reg" onClick={() => changeBrush('dot')}>
        ▣
      </button>
      <button className="btn-reg" onClick={() => changeBrush('horizontal')}>
        ↔
      </button>
      <button className="btn-reg" onClick={() => changeBrush('vertical')}>
        ↕
      </button>
      <button className="btn-reg" onClick={() => changeBrush('cross')}>
        ✚
      </button>
      <button className="btn-reg" onClick={() => changeBrush('fill')}>
        Fill ▩
      </button>
      <button className="btn-reg" onClick={fieldRandomBrush}>
        Fill random ⊞
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
