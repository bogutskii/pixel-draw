import React, {useState} from "react";
import {connect} from "react-redux";


const FieldSize = (props) => {
    const {} = props;




    return <div className="container">
        <div className="tabs">
            <input type="radio" id="radio-1" name="tabs" checked/>
            <label className="tab" htmlFor="radio-1">100<span className="notification"></span></label>
            <input type="radio" id="radio-2" name="tabs"/>
            <label className="tab" htmlFor="radio-2">400</label>
            <input type="radio" id="radio-3" name="tabs"/>
            <label className="tab" htmlFor="radio-3">1600</label>
            <span className="glider"></span>
        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(FieldSize);
