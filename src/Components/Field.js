import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Field.css';
import Brush from './Brush';
import ColorHisory from './ColorHistory';
import FieldSize from './FieldSize';
import DrawHistory from './DrawHistory';
import domtoimage from 'dom-to-image';
import { v4 as uuidv4 } from 'uuid';
import ColorChanger from './ColorChanger';
import CurrentColor from './CurrentColor';

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
    }
  };
  const onKeyUp = (e) => {
    if (e.code === 'Space' || e.type === 'mouseup') {
      setContinueToDraw(false);
    }
  };

  const saveToImage = () => {
    domtoimage
      .toJpeg(document.getElementById('capture'), { quality: 0.95 })
      .then(function (dataUrl) {
        let link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className="wrap-app">
      <div>
        {/*Tools*/}
        <FieldSize />
        <Brush />
        <ColorHisory />
        <ColorChanger />
        <CurrentColor />
        <div>
          {/*Range field size*/}
          <label>{fieldSize} px</label>
          <input
            type="range"
            className="range-field-size"
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
          Grid
        </div>
        <button onClick={clearField} className="btn-reg warn">
          Clear
        </button>
        <button onClick={saveToImage} className="btn-reg">
          Download
        </button>
      </div>
      {/*FIELD DRAW*/}
      <div>
        <div
          id={'capture'}
          className="grid"
          id="capture"
          style={{
            width: fieldSize + 'px',
            height: fieldSize + 'px',
          }}
          onMouseDown={onKeyPressed}
          onMouseUp={onKeyUp}
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
              onMouseOver={
                props.brush !== 'fill'
                  ? () => changePixelColor(continueToDraw ? i : undefined)
                  : null
              }
            >
              {i}
            </div>
          ))}
        </div>
      </div>
      <div className="draw-history-wrap">
        <DrawHistory />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  field: state.field,
  pixelSize: state.pixelSize,
  brush: state.brush,
});

const mapDispatchToProps = (dispatch) => ({
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
