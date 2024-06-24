import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Field.css';
import Brush from '../Tools/Brush';
import ColorHistory from '../Tools/ColorHistory';
import FieldSize from './FieldSize';
import DrawHistory from '../DrawHistory';
import domtoimage from 'dom-to-image';
import ColorChanger from '../Tools/ColorChanger';
import CurrentColor from '../Tools/CurrentColor';

const Field = () => {
  const [continueToDraw, setContinueToDraw] = useState(false);
  const [gridMap, setGridMap] = useState(true);
  const [fieldSize, setFieldSize] = useState('800');

  const dispatch = useDispatch();

  const field = useSelector((state) => state.auth.field);
  const pixelSize = useSelector((state) => state.auth.pixelSize);
  const brush = useSelector((state) => state.auth.brush);
  const currentColor = useSelector((state) => state.auth.currentColor);
  const historyColor = useSelector((state) => state.auth.historyColor);

  const changePixelColor = useCallback(
    (index) => {
      if (!field || !field[index]) return;

      const color = field[index].color;
      if (color && !historyColor.includes(color)) {
        dispatch({
          type: 'ADD_COLOR_TO_HISTORY',
          payload: { color },
        });
      }
      dispatch({
        type: 'CHANGE_PIXEL_COLOR_AND_SAVE_TO_HISTORY',
        payload: { index, color: currentColor },
      });
    },
    [dispatch, field, currentColor, historyColor]
  );

  const clearField = useCallback(() => {
    dispatch({
      type: 'CLEAR_FIELD',
    });
  }, [dispatch]);

  const onKeyPressed = useCallback((e) => {
    if (e.code === 'Space' || e.type === 'mousedown') {
      setContinueToDraw(true);
    }
  }, []);

  const onKeyUp = useCallback((e) => {
    if (e.code === 'Space' || e.type === 'mouseup') {
      setContinueToDraw(false);
    }
  }, []);

  const saveToImage = useCallback(() => {
    domtoimage
      .toJpeg(document.getElementById('capture'), { quality: 0.95 })
      .then((dataUrl) => {
        let link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }, []);

  const fieldMemo = useMemo(() => {
    if (!field || !Array.isArray(field)) {
      return <p>Loading...</p>;
    }

    return (
      <div
        id="capture"
        className="grid"
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
              brush !== 'fill' && brush !== 'fillPart'
                ? () => changePixelColor(continueToDraw ? i : undefined)
                : null
            }
          >
            {}
          </div>
        ))}
      </div>
    );
  }, [field, fieldSize, pixelSize, gridMap, brush, changePixelColor, onKeyPressed, onKeyUp, continueToDraw]);

  return (
    <div className="wrap-app">
      <div>
        {/* Tools */}
        <FieldSize />
        <Brush />
        <ColorHistory />
        <ColorChanger />
        <CurrentColor />
        <div>
          {/* Range field size */}
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
        {/* Grid map ON/OFF */}
        <div className="grid-Map mg-10 vert-middle">
          <label className="switch">
            <input
              type="checkbox"
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
      {/* FIELD DRAW */}
      <div>{fieldMemo}</div>
      <div className="draw-history-wrap">
        <DrawHistory />
      </div>
    </div>
  );
};

export default Field;
