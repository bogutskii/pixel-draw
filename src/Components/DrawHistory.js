import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDraws } from '../Components/redux/actions';

const DrawHistory = (props) => {
  useEffect(() => {
    props.getDraws();
  }, []);
  const [name, setName] = useState('');
  const { historyList, addToHistory, getFromHistory } = props;

  const saveNameInList = () => {
    if (name && !historyList.some((el) => el.name === name)) {
      addToHistory(name);
      setName('');
    }
  };
  return (
    <div>
      <ul>
        {historyList.map((el, i) => (
          <li className="draw-history-item" onClick={() => getFromHistory(el.name, i)}>
            {el.name}

            <button>delete</button>
            <button>re-Save</button>
          </li>
        ))}
      </ul>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={saveNameInList}>save</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  historyList: state.drawHistory,
});

const mapDispatchToProps = (dispatch) => ({
  addToHistory: (name) =>
    dispatch({
      type: 'ADD_DRAW_TO_HISTORY',
      payload: {
        name,
      },
    }),
  getFromHistory: (name, index) =>
    dispatch({
      type: 'GET_DRAW_FROM_HISTORY',
      payload: {
        name,
        index,
      },
    }),
  getDraws: () => dispatch(getDraws()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawHistory);
