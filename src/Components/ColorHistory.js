import React, {useState} from "react";
import {connect} from "react-redux";

const HistoryColor = (props) => {
const {historyColor} = props;



    const saveToHistory = (ind) => {

        if (!historyColor.includes(currentColor)) {
            setColorHistory([...historyColor, currentColor]);
        }

        setBlock(
            [...block].map((el, i) =>
                i === ind ? {...el, color: currentColor} : el
            )
        );
    };

    return <div className="color-history">
        {historyColor.map((el, i) => (
            <div
                className="pixel-history"
                style={{background: el}}
                onClick={() => changePixelColor(el)}
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

})


export default connect(mapStateToProps, mapDispatchToProps)(HistoryColor);
