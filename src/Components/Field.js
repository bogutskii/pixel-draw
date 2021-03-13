import React, {useState} from "react";
import {connect} from "react-redux";
import "./Field.css";
import Brush from "./Brush";
import ColorHisory from "./ColorHistory";
import FieldSize from "./FieldSize";

const Field = (props) => {
    const [continueToDraw, setContinueToDraw] = useState(false);

    const {field, currentColor, changeColor, saveToHistory, changePixelColor, clearField, pixelSize} = props;

    const onKeyPressed = (e) => {
        if (e.code === "Space" || e.type === "mousedown" ) {

            setContinueToDraw(true);
        }
    };
    const onKeyUp = (e) => {
        if (e.code === "Space" || e.type === "mouseup") {
            setContinueToDraw(false);
        }
    };

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

            <div className="grid"
                onKeyDown={onKeyPressed}
                onMouseDown={onKeyPressed}
                onMouseUp = {onKeyUp}
                onKeyUp={onKeyUp}
                onMouseLeave={()=>setContinueToDraw(false)}

                tabIndex="0"



            >
                {field.map((el, i) => (
                    <div
                        className="pixel"
                        style={{background: el.color, width: pixelSize+'%', height: pixelSize+'%'}}
                        onClick={() => changePixelColor(i)}
                        onMouseOver= {()=>changePixelColor( continueToDraw ? i : undefined)}

                    >
                        {/*{' '}*/}
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



