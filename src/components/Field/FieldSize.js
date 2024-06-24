import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const FieldSize = () => {
  const dispatch = useDispatch();
  const currentSize = useSelector((state) => state.auth.fieldSize);

  const changeFieldSize = (size) => {
    dispatch({
      type: 'CHANGE_FIELD_SIZE',
      payload: { size },
    });
  };

  return (
    <div className="container">
      <div className="tabs">
        <input
          type="radio"
          id="radio-1"
          onChange={() => changeFieldSize(100)}
          checked={currentSize === 100}
        />
        <label className="tab" htmlFor="radio-1">
          100
        </label>

        <input
          type="radio"
          id="radio-2"
          onChange={() => changeFieldSize(400)}
          checked={currentSize === 400}
        />
        <label className="tab" htmlFor="radio-2">
          400
        </label>

        <input
          type="radio"
          id="radio-3"
          onChange={() => changeFieldSize(1600)}
          checked={currentSize === 1600}
        />
        <label className="tab" htmlFor="radio-3">
          1600
        </label>
        <span className="glider"></span>
      </div>
    </div>
  );
};

export default FieldSize;
