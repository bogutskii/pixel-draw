import React, {useState} from "react";
import {connect} from "react-redux";


const FieldSize = (props) => {
    const {currentSize,changeFieldSize} = props;




    return <div className="container">
        <div className="tabs">
            <input type="radio" id="radio-1" value={currentSize} onChange={(value)=>changeFieldSize(100)} checked={currentSize === 100}/>
            <label className="tab" htmlFor="radio-1">100</label>

            <input type="radio" id="radio-2"  value={currentSize} onChange={(value)=>changeFieldSize(400)} checked={currentSize === 400}/>
            <label className="tab" htmlFor="radio-2">400</label>

            <input type="radio" id="radio-3" value={currentSize} onChange={(value)=>changeFieldSize(1600)} checked={currentSize === 1600}/>
            <label className="tab" htmlFor="radio-3">1600</label>
        </div>




    </div>

}


const mapStateToProps = (state) => ({
    currentSize : state.currentSize
})

const mapDispatchToProps = (dispatch) => ({

    changeFieldSize: (size) => dispatch({
        type: 'CHANGE_FIELD_SIZE',
        payload: {
            size
        }
    }),


})


export default connect(mapStateToProps, mapDispatchToProps)(FieldSize);
