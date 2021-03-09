import React, {useState} from "react";
import {connect} from "react-redux";
import "./Field.css";
import Brush from "./Brush";
import ColorHisory from "./ColorHistory";
import FieldSize from "./FieldSize";

const Field = (props) => {

    const {field, currentColor, changeColor, saveToHistory, changePixelColor, clearField, pixelSize} = props;


    return (
        <>
            <FieldSize/>
            <Brush/>
            <ColorHisory/>

            <input
                type="color"
                value={currentColor}
                onChange={(e) => changeColor(e.target.value)}
            />

            <div className="grid">
                {field.map((el, i) => (
                    <div
                        className="pixel"
                        style={{background: el.color, width: pixelSize+'%', height: pixelSize+'%'}}
                        onClick={() => changePixelColor(i)}
                    >
                        {' '}
                    </div>
                ))}
            </div>
            <p></p>
            <button onClick={clearField}>Clear field</button>
        </>
    );
};

const mapStateToProps = (state) => ({
    field: state.field,
    pixelSize: state.pixelSize,
    currentColor: state.currentColor
})

const mapDispatchToProps = (dispatch) => ({

    changeColor: (color) => dispatch({
        type: 'CHANGE_CURRENT_COLOR',
        payload: {
            color
        }
    }),
    changePixelColor: (index) => dispatch({
        type: 'CHANGE_PIXEL_COLOR_AND_SAVE_TO_HISTORY',
        payload: {
            index
        }
    }), clearField: () => dispatch({
        type: 'CLEAR_FIELD',
        payload: {}
    }),

})


export default connect(mapStateToProps, mapDispatchToProps)(Field);



