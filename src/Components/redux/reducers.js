const initialState = {
  fieldSize: 100,
  field: [...new Array(100).fill({ color: '#ffffff' })],
  pixelSize: 10,
  historyColor: ['#ffffff', '#000000'],
  currentColor: '#000000',
  brush: 'dot',
  drawHistory: [],
  username: 'unknown123',
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
      let copyHistoryColor = [...state.historyColor, state.currentColor];

      const brushFill = (index, brush, size, array) => {
        let range = [];
        let checkList = [];
        if (brush === 'horizontal') {
          range = horizontal(index, size);
        } else if (brush === 'vertical') {
          checkList = vertical(index, size);
        } else if (brush === 'fill') {
          range = [0, state.fieldSize - 1];
        } else if (brush === 'cross') {
          range = horizontal(index, size);
          checkList = vertical(index, size);
        } else if (brush === 'mirrorH') {
          let dif = size === 400 ? 380 : size === 1600 ? 1560 : 90; //10 -- 1550= 1570  30 -1530 = 1590
          let m = 0;
          if (size === 1600 && index % 20 > 9) {
            m += 20;
          }
          array[index] = { ...array[index], color: state.currentColor };
          array[Math.abs(dif - index + (index % 10) * 2 + m)] = {
            ...array[Math.abs(dif - index + (index % 10) * 2 + m)],
            color: state.currentColor,
          };
          return array;
        } else if (brush === 'mirrorV') {
          let dif = size === 400 ? 20 : size === 1600 ? 40 : 10; //10 -- 1550= 1570  30 -1530 = 1590
          let m = 0;
          // if (size === 1600 && index % 20 > 9) {
          //   m += 20;
          // }
          array[index] = { ...array[index], color: state.currentColor };
          array[Math.abs(dif - 1 - (index % dif) + index - (index % dif))] = {
            ...array[Math.abs(dif - 1 - (index % dif) + index - (index % dif))],
            color: state.currentColor,
          };
          return array;
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

      copyField = brushFill(action.payload.index, state.brush, state.fieldSize, [
        ...state.field,
      ]);
      return {
        ...state,
        field: copyField,
        historyColor: [...new Set(copyHistoryColor)],
      };

    // end draw brush
    case 'CLEAR_FIELD':
      return {
        ...state,
        field: new Array(state.fieldSize).fill({ color: 'white' }),
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
          fieldSize: 100,
          pixelSize: 10,
        };
      } else if (action.payload.size === 400) {
        return {
          ...state,
          field: new Array(400).fill({ color: 'white' }),
          fieldSize: 400,
          pixelSize: 5,
        };
      } else if (action.payload.size === 1600) {
        return {
          ...state,
          field: new Array(1600).fill({ color: 'white' }),
          fieldSize: 1600,
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
    case 'SWITCH_COLOR':
      console.log(action.payload.color, action.payload.toColor);
      return {
        ...state,
      };

    case 'ADD_DRAW_TO_HISTORY':
      return {
        ...state,
        drawHistory: [...state.drawHistory, action.payload],
      };
    case 'GET_DRAW_FROM_HISTORY':
      return { ...state, ...state.drawHistory[action.payload.index] };

    case 'GET_DRAWS_FROM_SERVER':
      return { ...state, drawHistory: action.payload };

    case 'DELETE_DRAW_FROM_HISTORY':
      console.log(action.payload.id);
      let copyDrawList = [...state.drawHistory].filter(
        (draw) => draw._id !== action.payload,
      );
      return { ...state, drawHistory: copyDrawList };

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
