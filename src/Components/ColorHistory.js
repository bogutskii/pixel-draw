import React, {useState} from "react";
import {connect} from "react-redux";

const ColorHisory = (props) => {

    const [colorHistory, setColorHistory] = useState([]);

    const saveToHistory = (ind) => {

        if (!colorHistory.includes(currentColor)) {
            setColorHistory([...colorHistory, currentColor]);
        }

        setBlock(
            [...block].map((el, i) =>
                i === ind ? {...el, color: currentColor} : el
            )
        );
    };

    return <div className="color-history">
        {colorHistory.map((el, i) => (
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
    state: state
})

const mapDispatchToProps = (dispatch) => ({

    changeCreateModal: (value) => dispatch({
        type: 'CHANGE_CREATE_MODAL',
        payload: {
            value: value
        }
    }),

})


export default connect(mapStateToProps, mapDispatchToProps)(ColorHisory);
