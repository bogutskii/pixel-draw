import React, {useState} from "react";
import {connect} from "react-redux";

const DrawHistory = (props) => {
    const [name, setName] = useState('')
    const {historyList, addToHistory, getFromHistory} = props

    const saveNameInList = () => {
        if (name && !historyList.some(el => el.name === name)) {
            addToHistory(name)
            setName('')
        }
    }
    return <div>

        <select size="5">
            {historyList.map((el, i) => <option onClick={() => getFromHistory(el.name, i)}>{el.name}</option>)}
        </select>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <button onClick={saveNameInList}>save</button>
    </div>
}


const mapStateToProps = (state) => ({
    historyList: state.drawHistory
})

const mapDispatchToProps = (dispatch) => ({
    addToHistory: (name) => dispatch({
        type: 'ADD_DRAW_TO_HISTORY',
        payload: {
            name
        }
    }),
    getFromHistory: (name, index) => dispatch({
        type: 'GET_DRAW_FROM_HISTORY',
        payload: {
            name, index
        }
    }),


})


export default connect(mapStateToProps, mapDispatchToProps)(DrawHistory);
