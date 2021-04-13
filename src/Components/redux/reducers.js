const initialState = {
  currentSize: 100,
  field: [...new Array(100).fill({ color: '#ffffff' })],
  pixelSize: 10,
  historyColor: ['#ffffff', '#000000'],
  currentColor: '#000000',
  brush: 'dot',
  drawHistory: [],
};

const drawField = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_COLOR':
      return {
        ...state,
        currentColor: action.payload.color,
      };
    // ******** START DRAW FUNCTIONAL **********************
    case 'CHANGE_PIXEL_COLOR_AND_SAVE_TO_HISTORY':
      let copyField;
      let copyHistoryColor = [...state.historyColor];
      if (!copyHistoryColor.includes(state.currentColor)) {
        copyHistoryColor.push(state.currentColor);
      }

      const brushFill = (index, brush, size, array) => {
        let range = [];
        let checkList = [];
        if (brush === 'horizontal') {
          range = horizontal(index, size);
        } else if (brush === 'vertical') {
          checkList = vertical(index, size);
        } else if (brush === 'fill') {
          range = [0, state.currentSize - 1];
        } else if (brush === 'cross') {
          range = horizontal(index, size);
          checkList = vertical(index, size);
        } else {
          range = [index, index];
        }
        return array.map((el, i) =>
          (i >= range[0] && i <= range[1]) ||
          (checkList.includes(i) && checkList.length > 0)
            ? {
                ...el,
                color: state.currentColor,
              }
            : el,
        );
      };

      copyField = brushFill(action.payload.index, state.brush, state.currentSize, [
        ...state.field,
      ]);
      return {
        ...state,
        field: copyField,
        historyColor: copyHistoryColor,
      };

    // end draw brush
    case 'CLEAR_FIELD':
      return {
        ...state,
        field: new Array(state.currentSize).fill({ color: 'white' }),
        brush: 'dot',
      };
    case 'DELETE_COLOR_HISTORY':
      return {
        ...state,
        historyColor: ['#000000'],
      };
    case 'CHANGE_FIELD_SIZE':
      if (action.payload.size === 100) {
        return {
          ...state,
          field: new Array(100).fill({ color: 'white' }),
          currentSize: 100,
          pixelSize: 10,
        };
      } else if (action.payload.size === 400) {
        return {
          ...state,
          field: new Array(400).fill({ color: 'white' }),
          currentSize: 400,
          pixelSize: 5,
        };
      } else if (action.payload.size === 1600) {
        return {
          ...state,
          field: new Array(1600).fill({ color: 'white' }),
          currentSize: 1600,
          pixelSize: 2.5,
        };
      } else {
        return state;
      }

    case 'CHANGE_BRUSH':
      return {
        ...state,
        brush: action.payload.brush,
      };

    case 'ADD_DRAW_TO_HISTORY':
      return {
        ...state,
        drawHistory: [
          ...state.drawHistory,
          {
            name: action.payload.name,
            size: state.currentSize,
            pixelSize: state.pixelSize,
            field: state.field,
          },
        ],
      };
    case 'GET_DRAW_FROM_HISTORY':
      return {
        ...state,
        currentSize: state.drawHistory[action.payload.index].currentSize,
        field: state.drawHistory[action.payload.index].field,
        pixelSize: state.drawHistory[action.payload.index].pixelSize,
      };
    case 'FILL_RANDOM_BRUSH':
      const lnHistory = state.historyColor.length;
      const rand = () => {
        Math.floor(Math.random() * lnHistory);
      };
      let randomField = state.field.map(function (el) {
        return {
          ...el,
          color: state.historyColor[Math.floor(Math.random() * lnHistory)],
        };
      });
      console.log(rand, randomField);
      return {
        ...state,
        field: randomField,
      };
    default:
      return state;
  }
};

const horizontal = (index, size) => {
  if (size === 100) {
    let r1 = Math.floor(index / 10); // 9
    return [r1 * 10, r1 * 10 + 9];
  } else if (size === 400) {
    let r2 = Math.floor(index / 20); // 9
    return [r2 * 20, r2 * 20 + 19];
  } else if (size === 1600) {
    let r2 = Math.floor(index / 40); // 9
    return [r2 * 40, r2 * 40 + 39];
  }
};
const vertical = (index, size) => {
  let chList = [];
  let part = 10;
  if (size === 400) {
    part = 20;
  } else if (size === 1600) {
    part = 40;
  }
  let p1 = index % part;
  for (let i = 0; i < part; i++) {
    chList.push(p1 + i * part);
  }
  return chList;
};

export default drawField;
