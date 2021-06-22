import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Field.css';
import Brush from './Brush';
import ColorHisory from './ColorHistory';
import FieldSize from './FieldSize';
import DrawHistory from './DrawHistory';
import { v4 as uuidv4 } from 'uuid';

const Field = (props) => {
  const [continueToDraw, setContinueToDraw] = useState(false);
  const [gridMap, setGridMap] = useState(true);
  const [fieldSize, setFieldSize] = useState('800');

  const {
    field,
    currentColor,
    changeColor,
    changePixelColor,
    clearField,
    pixelSize,
  } = props;

  const onKeyPressed = (e) => {
    if (e.code === 'Space' || e.type === 'mousedown') {
      setContinueToDraw(true);
      console.log('pres');
    }
  };
  const onKeyUp = (e) => {
    if (e.code === 'Space' || e.type === 'mouseup') {
      setContinueToDraw(false);
    }
    console.log('up');
  };

  return (
    <div className="wrap-app">
      <div>
        {/*Tools*/}
        <FieldSize />
        <Brush />
        <ColorHisory />
        <DrawHistory />
        <input
          type="color"
          value={currentColor}
          onChange={(e) => changeColor(e.target.value)}
        />
        <div>
          {/*Range field size*/}
          <label>{fieldSize} px</label>
          <input
            type="range"
            onChange={(event) => setFieldSize(event.target.value)}
            min="400"
            max="1200"
            step="100"
            value={fieldSize}
            width="800px"
          />
        </div>
        {/*Grid map ON/OFF*/}
        <div className="grid-Map mg-10 vert-middle">
          <label className="switch">
            <input
              type="checkbox"
              value={gridMap}
              checked={gridMap}
              onChange={() => setGridMap(!gridMap)}
            />
            <span className="slider"></span>
          </label>
          Grid Map
        </div>
        <button onClick={clearField}>Clear field</button>
      </div>
      {/*FIELD DRAW*/}
      <div
        className="grid"
        style={{
          width: fieldSize + 'px',
          height: fieldSize + 'px',
        }}
        //onKeyDown={onKeyPressed}
        onMouseDown={onKeyPressed}
        onMouseUp={onKeyUp}
        //onKeyUp={onKeyUp}
        onMouseLeave={() => setContinueToDraw(false)}
        tabIndex="0"
      >
        {field.map((el, i) => (
          <div
            className="pixel"
            key={i}
            style={{
              background: el.color,
              width: pixelSize + '%',
              height: pixelSize + '%',
              border: gridMap ? '1px solid lightgrey' : '',
            }}
            onClick={() => changePixelColor(i)}
            onMouseOver={() => changePixelColor(continueToDraw ? i : undefined)}
          >
            {' '}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  field: state.field,
  pixelSize: state.pixelSize,
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
  changePixelColor: (index) =>
    dispatch({
      type: 'CHANGE_PIXEL_COLOR_AND_SAVE_TO_HISTORY',
      payload: {
        index,
      },
    }),
  clearField: () =>
    dispatch({
      type: 'CLEAR_FIELD',
      payload: {},
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Field);
