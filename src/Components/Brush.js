import React from 'react'
import {connect} from "react-redux";




const Brush = (props)=>{
    const {changeBrush} = props
    return <div className='brush-block'>

        <button className='btn-brush' onClick={()=> changeBrush('dot')}>⊡ ▣</button>
        <button className='btn-brush' onClick={()=> changeBrush('horizontal')}>↔</button>
        <button className='btn-brush' onClick={()=> changeBrush('vertical')}>↕</button>
        <button className='btn-brush' onClick={()=> changeBrush('cross')}>✚</button>
        <button className='btn-brush' onClick={()=> changeBrush('random')}>Fill ▩</button>
        <button className='btn-brush' onClick={()=> changeBrush('random')}>Fill random ⊞</button>

    </div>
}
const mapStateToProps = (state) => ({
   brush: state.brush
})

const mapDispatchToProps = (dispatch) => ({
    changeBrush: (brush) => dispatch({
        type: 'CHANGE_BRUSH',
        payload: {
            brush
        }
    }),


})


export default connect(mapStateToProps, mapDispatchToProps)(Brush);
