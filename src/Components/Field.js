import React, {useState} from "react";
import {connect} from "react-redux";
import "./Field.css";
import Brush from "./Brush";
import ColorHisory from "./ColorHistory";

const Field = (props) => {

    const {field, currentColor} = props;
   // const [block, setBlock] = useState(new Array(100).fill({color: "white"}));
    //const [currentColor, setCurrentColor] = useState("#000000");

    const changeColor = (e) => {
        setCurrentColor(e);
    };
    const changePixelColor = (color) => {
        setCurrentColor(color);
    };
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
                        onClick={() => saveToHistory(i)}
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
    //
    // changeLetterOnClicked: (index) => dispatch({
    //     type: 'CHANGE_LETTER_ON_CLICKED',
    //     payload: {
    //         index: index
    // //     }
    // }),

})


export default connect(mapStateToProps, mapDispatchToProps)(Field);



