import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Field.css';
import Brush from './Brush';
import ColorHisory from './ColorHistory';
import FieldSize from './FieldSize';
import DrawHistory from './DrawHistory';

const Field = (props) => {
  const [continueToDraw, setContinueToDraw] = useState(false);
  const [gridMap, setGridMap] = useState(true);

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
    <>
      <FieldSize />
      <Brush />
      <ColorHisory />
      <DrawHistory />

      <input
        type="color"
        value={currentColor}
        onChange={(e) => changeColor(e.target.value)}
      />
      <div className="grid-Map mg-10">
        <div>
          <input
            type="checkbox"
            value={gridMap}
            checked={gridMap}
            onChange={() => setGridMap(!gridMap)}
          />
          <label htmlFor="border">Grid Map</label>
        </div>
      </div>

      <div
        className="grid"
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
            style={{
              background: el.color,
              width: pixelSize + '%',
              height: pixelSize + '%',
              border: gridMap ? '1px solid lightgrey' : '',
            }}
            onClick={() => changePixelColor(i)}
            onMouseOver={() => changePixelColor(continueToDraw ? i : undefined)}
          >
            {/*{' '}*/}{' '}
          </div>
        ))}
      </div>

      <button onClick={clearField}>Clear field</button>
    </>
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
