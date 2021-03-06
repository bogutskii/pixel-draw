

const initialState = {
    fields: [new Array(100).fill({color: "white"})],
    pixelSize: 10,
    history:[],
    currentColor: '#000000'

}
const drawField = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state
    }
}
export default drawField;