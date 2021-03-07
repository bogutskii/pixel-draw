

const initialState = {
    field: new Array(100).fill({color: "white"}),
    pixelSize: 10,
    historyColor:['#000000'],
    currentColor: '#000000'

}
const drawField = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_COLOR' :
            return {
                ...state, currentColor: action.payload.color
            }

        case 'CHANGE_PIXEL_COLOR_AND_SAVE_TO_HISTORY':
            let copyHistoryColor = [...state.historyColor]
            if (!copyHistoryColor.includes(state.currentColor)) {
                copyHistoryColor.push(state.currentColor)
            }
            let copyField = [...state.field].map((el,i)=> i === action.payload.index ? {...el, color: state.currentColor}: el)
            return {
                ...state, field: copyField,historyColor: copyHistoryColor
            }


        default:
            return state
    }
}
export default drawField;