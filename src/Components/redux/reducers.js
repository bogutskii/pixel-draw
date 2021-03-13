const initialState = {
    currentSize: 100,
    field: new Array(100).fill({color: "white"}),
    pixelSize: 10,
    historyColor: ['#000000'],
    currentColor: '#000000',
    brush: 'dot'

}


const drawField = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_COLOR' :
            return {
                ...state, currentColor: action.payload.color
            }
// ******** START DRAW FUNCTIONAL **********************
        case 'CHANGE_PIXEL_COLOR_AND_SAVE_TO_HISTORY':
            let copyHistoryColor = [...state.historyColor]
            if (!copyHistoryColor.includes(state.currentColor)) {
                copyHistoryColor.push(state.currentColor)
            }

            const brushFill = (index, brush, size, array) => {
                let range = [0, 9];
                if (brush === 'horizontal') {
                    if (index > 9) {
                        let r1 = Math.floor(index / 10) // 9
                        range = [r1 * 10, r1 * 10 + 9]
                    }
                } else if (brush === 'vertical') {
                    let chekList = []
                    let part = 10
                    if (size === 400) {
                        part = 20
                    } else if (size === 1600) {
                        part = 40
                    }
                    let p1 = index%part
                    for (let i = 0; i < part; i++) {
    chekList.push(p1+ (i * part))
                    }
                    return array.map((el, i) => chekList.includes(i) ? {
                        ...el,
                        color: state.currentColor
                    } : el)
                }


// 100 -10
//40 - 20
//1600 - 40



                else {
                    range = [index, index]
                }


                return array.map((el, i) => (i >= range[0] && i <= range[1]) ? {
                    ...el,
                    color: state.currentColor
                } : el)
            }


            // let copyField = [...state.field].map((el, i) => i === action.payload.index ? {
            //     ...el,
            //     color: state.currentColor
            // } : el)
            let copyField = brushFill(action.payload.index, state.brush, state.currentSize, [...state.field])

            return {
                ...state, field: copyField, historyColor: copyHistoryColor
            }


        // end draw brush
        case 'CLEAR_FIELD':

            return {
                ...state, field: new Array(state.currentSize).fill({color: "white"})
            }
        case 'DELETE_COLOR_HISTORY':

            return {
                ...state, historyColor: ['#000000']
            }
        case 'CHANGE_FIELD_SIZE':
            if (action.payload.size === 100) {
                return {
                    ...state,
                    field: new Array(100).fill({color: "white"}),
                    currentSize: 100,
                    pixelSize: 10
                }
            } else if (action.payload.size === 400) {
                return {
                    ...state,
                    field: new Array(400).fill({color: "white"}),
                    currentSize: 400,
                    pixelSize: 5
                }
            } else if (action.payload.size === 1600) {
                return {
                    ...state,
                    field: new Array(1600).fill({color: "white"}),
                    currentSize: 1600,
                    pixelSize: 2.5
                }

            }
        case 'CHANGE_BRUSH':
            return {
                ...state, brush: action.payload.brush
            }


        default:
            return state
    }
}
export default drawField;