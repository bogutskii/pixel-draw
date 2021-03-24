import React, {useState} from "react";
import {connect} from "react-redux";

const DrawHistory = (props) => {
    const [name, setName] = useState('')
    const {historyList, addToHistory} = props

    const saveNameInList = () => {
    if(name){
        addToHistory(name)
    }
    }
    return <div>

        <select size="5">
            {historyList.map(el => <option>{el.name}</option>)}
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


})


export default connect(mapStateToProps, mapDispatchToProps)(DrawHistory);
