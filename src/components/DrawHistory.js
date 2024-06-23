import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDrawToHistory, deleteDraw, getDraws } from './redux/actions';
import Preloader from './preloader/Preloader';
import { v4 as uuidv4 } from 'uuid';

const DrawHistory = () => {
  const dispatch = useDispatch();

  const drawHistory = useSelector((state) => state.auth.drawHistory);
  const field = useSelector((state) => state.auth.field);
  const pixelSize = useSelector((state) => state.auth.pixelSize);
  const fieldSize = useSelector((state) => state.auth.fieldSize);
  const username = useSelector((state) => state.auth.username);

  useEffect(() => {
    dispatch(getDraws());
  }, [dispatch]);

  const [inputName, setInputName] = useState('');

  const addDrawToHistoryButtonHandler = () => {
    let newDraw = {
      name: inputName,
      field: field,
      pixelSize: pixelSize,
      fieldSize: fieldSize,
      username: username,
      id: uuidv4()
    };
    dispatch(addDrawToHistory(newDraw));
    setInputName('');
  };

  const saveNameInList = () => {
    if (inputName) {
      addDrawToHistoryButtonHandler();
    }
  };

  const deleteDrawReq = (id, author) => {
    // if (username === author) {
      dispatch(deleteDraw(id));
    // }
  };

  return (
    <div className="drawHistory">
      <form className="form-inline">
        <input
          value={inputName}
          className="input-save"
          maxLength="15"
          size="17"
          onChange={(e) => setInputName(e.target.value)}
        />
        <button type="button" onClick={saveNameInList} className="btn-reg mg-0-a">
          Save
        </button>
      </form>
      {Array.isArray(drawHistory) && drawHistory.length ? (
        <ul className="list-ul">
          {drawHistory.map((item, i) => (
            <li className="list-li" key={item.id || uuidv4()}>
              <div className="item_wrap">
                <div className="child-grow" onClick={() => dispatch({ type: 'GET_DRAW_FROM_HISTORY', payload: { index: i } })}>
                  {item.name + ' ' + item.username}
                </div>
                <div>
                  <button className="btn" onClick={() => deleteDrawReq(item.id, item.username)}>
                    X
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default DrawHistory;
