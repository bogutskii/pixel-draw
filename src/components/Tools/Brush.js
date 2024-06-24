import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import fill from '../icons/fill.png';
import random from '../icons/random.jpeg';
import colorpicker from '../icons/colorpicker.png';

const Brush = () => {
  const dispatch = useDispatch();
  const brush = useSelector((state) => state.auth.brush);

  const brushTypes = [
    { type: 'dot', label: '▣' },
    { type: 'horizontal', label: '↔' },
    { type: 'vertical', label: '↕' },
    { type: 'cross', label: '✚' },
    { type: 'fill', label: <img src={fill} className="img-icon-btn" alt="icon-fill" /> },
    { type: 'fillPart', label: 'fillPart' },
    { type: 'mirrorH', label: '═' },
    { type: 'mirrorV', label: '||' },
    { type: 'color-picker', label: <img src={colorpicker} className="img-icon-btn" alt="icon-colorpicker" /> },
  ];

  const changeBrush = (type) => {
    dispatch({
      type: 'CHANGE_BRUSH',
      payload: { brush: type },
    });
  };

  const fieldRandomBrush = () => {
    dispatch({
      type: 'FILL_RANDOM_BRUSH',
      payload: {},
    });
  };

  return (
    <div className="brush-block">
      {brushTypes.map(({ type, label }) => (
        <button
          key={type}
          className={classnames('btn-reg', { 'btn-pushed': brush === type })}
          onClick={() => changeBrush(type)}
        >
          {label}
        </button>
      ))}
      <button className="btn-reg" onClick={fieldRandomBrush}>
        <img src={random} className="img-icon-btn" alt="icon-random" />
      </button>
    </div>
  );
};

export default Brush;
