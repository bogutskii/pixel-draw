import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDraws, addDrawToHistory } from '../Components/redux/actions';
import { v4 as uuidv4 } from 'uuid';

const DrawHistory = (props) => {
  useEffect(() => {
    props.getDraws();
  }, []);

  // useEffect(() => {
  //   props.addDrawToHistory(historyList);
  // }, []);

  const [inputName, setInputName] = useState('');
  const {
    historyList,
    setDrawHistory,
    getFromHistory,
    pixelSize,
    field,
    fieldSize,
  } = props;

  const addDrawToHistoryButtonHandler = () => {
    let newDraw = {
      name: inputName,
      field: field,
      pixelSize: pixelSize,
      fieldSize: fieldSize,
      username: 'Admin',
    };
    props.addDrawToHistory(newDraw);
  };

  const saveNameInList = () => {
    if (inputName && !historyList.some((el) => el.name === inputName)) {
      addDrawToHistoryButtonHandler();
      setInputName('');
    }
  };
  return (
    <div>
      <ul>
        {historyList.map((el, i) => (
          <li
            className="draw-history-item"
            key={uuidv4()}
            onClick={() => getFromHistory(el.name, i)}
          >
            {el.name}

            <button>delete</button>
            <button>re-Save</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <button onClick={saveNameInList}>save</button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  historyList: state.drawHistory,
  field: state.field,
  pixelSize: state.pixelSize,
  fieldSize: state.fieldSize,
});

const mapDispatchToProps = (dispatch) => ({
  addDrawToHistory: (newDraw) => dispatch(addDrawToHistory(newDraw)),
  getDraws: () => dispatch(getDraws()),
  setDrawHistory: (historyTitle) =>
    dispatch({
      type: 'SAVE_HISTORY_TITLE',
      payload: { historyTitle },
    }),
  getFromHistory: (name, index) =>
    dispatch({
      type: 'GET_DRAW_FROM_HISTORY',
      payload: {
        name,
        index,
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawHistory);
