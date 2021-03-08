import React, {useState} from "react";
import {connect} from "react-redux";

const HistoryColor = (props) => {
const {historyColor,changeColor,deleteColorHistory} = props;




    return <div className="color-history">
        {historyColor.map((el, i) => (
            <div
                className="pixel-history"
                style={{background: el}}
                onClick={() => changeColor(el)}
            >
                {" "}
            </div>
        ))}
        <button onClick={deleteColorHistory}>delete history</button>
    </div>

}


const mapStateToProps = (state) => ({
    historyColor: state.historyColor
})

const mapDispatchToProps = (dispatch) => ({
    changeColor: (color) => dispatch({
        type: 'CHANGE_CURRENT_COLOR',
        payload: {
            color
        }
    }),
    deleteColorHistory: (color) => dispatch({
        type: 'DELETE_COLOR_HISTORY',

    }),

})


export default connect(mapStateToProps, mapDispatchToProps)(HistoryColor);
