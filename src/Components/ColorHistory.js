import React, {useState} from "react";
import {connect} from "react-redux";

const HistoryColor = (props) => {
const {historyColor,changeColor} = props;




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
    </div>

}


const mapStateToProps = (state) => ({
    historyColor: state.historyColor
})

const mapDispatchToProps = (dispatch) => ({

    changeCreateModal: (value) => dispatch({
        type: 'CHANGE_CREATE_MODAL',
        payload: {
            value: value
        }
    }),
    changeColor: (color) => dispatch({
        type: 'CHANGE_CURRENT_COLOR',
        payload: {
            color
        }
    }),

})


export default connect(mapStateToProps, mapDispatchToProps)(HistoryColor);
