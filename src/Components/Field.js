import React, {useState} from "react";
import {connect} from "react-redux";
import "./Field.css";
import Brush from "./Brush";
import ColorHisory from "./ColorHistory";

const Field = (props) => {

    const {field, currentColor, changeColor, saveToHistory, changePixelColor} = props;
    // const [block, setBlock] = useState(new Array(100).fill({color: "white"}));
    //const [currentColor, setCurrentColor] = useState("#000000");



    return (
        <>
            <Brush/>
            {/*{colorHistory.map((el,i) => <div  className='color-history' style={{background: el}}>.</div>)} */}
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
                        style={{background: el.color}}
                        onClick={() => changePixelColor(i)}
                    >
                        {i}
                    </div>
                ))}
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    field: state.field,
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
    }),

})


export default connect(mapStateToProps, mapDispatchToProps)(Field);



