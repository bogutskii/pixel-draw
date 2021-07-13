import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDraws, addDrawToHistory, deleteDraw } from '../Components/redux/actions';
import { v4 as uuidv4 } from 'uuid';
import Preloader from './preloader/Preloader';

const DrawHistory = (props) => {
  useEffect(() => {
    props.getDraws();
  }, []);

  // useEffect(() => {
  //   props.addDrawToHistory(historyList);
  // }, []);

  const [inputName, setInputName] = useState('');
  const { historyList, getFromHistory, pixelSize, field, fieldSize, username } = props;

  const addDrawToHistoryButtonHandler = () => {
    let newDraw = {
      name: inputName,
      field: field,
      pixelSize: pixelSize,
      fieldSize: fieldSize,
      username: username,
    };
    props.addDrawToHistory(newDraw);
    setInputName('');
  };

  const saveNameInList = () => {
    if (inputName) {
      addDrawToHistoryButtonHandler();
    }
  };

  const deleteDrawReq = (id, author) => {
    if (username === author) {
      props.deleteDraw(id);
    }
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
        <button onClick={saveNameInList} className="btn-reg mg-0-a">
          Save
        </button>
      </form>
      {historyList.length ? (
        <ul className="list-ul">
          {historyList.map((item, i) => (
            <li className="list-li" key={item._id}>
              <div className="item_wrap">
                <div className="child-grow" onClick={() => getFromHistory(i)}>
                  {item.name + ' ' + item.username}
                </div>

                <div>
                  {/*{username === item.username && (*/}
                  <button
                    className="btn"
                    onClick={() => deleteDrawReq(item._id, item.username)}
                  >
                    X
                  </button>
                  {/*)}*/}
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
const mapStateToProps = (state) => ({
  historyList: state.drawHistory,
  field: state.field,
  pixelSize: state.pixelSize,
  fieldSize: state.fieldSize,
  username: state.username,
});

const mapDispatchToProps = (dispatch) => ({
  addDrawToHistory: (newDraw) => dispatch(addDrawToHistory(newDraw)),
  deleteDraw: (id) => dispatch(deleteDraw(id)),
  getDraws: () => dispatch(getDraws()),
  getFromHistory: (index) =>
    dispatch({
      type: 'GET_DRAW_FROM_HISTORY',
      payload: {
        index,
      },
    }),
  //getDraw: () => dispatch(getDraw()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawHistory);
