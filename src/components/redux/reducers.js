const initialState = {
  fieldSize: 100,
  field: [...new Array(100).fill({ color: '#ffffff' })],
  pixelSize: 10,
  historyColor: ['#ffffff', '#000000'],
  currentColor: '#000000',
  brush: 'dot',
  drawHistory: [],
  username: 'Guest',
  user: null,
  token: localStorage.getItem('accessToken') || null,
  authError: null,
};

const drawField = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_COLOR':
      return {
        ...state,
        currentColor: action.payload.color
      };
    // ******** START DRAW FUNCTIONAL **********************
    case 'CHANGE_PIXEL_COLOR_AND_SAVE_TO_HISTORY':
      let copyField;
      const copyHistoryColor = [...state.historyColor, state.currentColor];
      if (state.brush === 'color-picker') {
        if (action.payload.index) {
          return {
            ...state,
            currentColor: state.field[action.payload.index].color
          };
        }
      }
      if (state.brush === 'fillPart') {
        let size = state.fieldSize === 100 ? 10 : state.fieldSize === 400 ? 20 : 40;
        const newField = fillParticip(
          JSON.stringify(state.field),
          action.payload.index,
          size,
          state.fieldSize,
          state.field[action.payload.index].color,
          state.currentColor
        );
        return {
          ...state,
          field: newField
        };
      }

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
          const dif = size === 400 ? 380 : size === 1600 ? 1560 : 90;
          let m = 0;
          if (size === 1600 && index % 20 > 9) {
            m += 20;
          }
          array[index] = {
            ...array[index],
            color: state.currentColor
          };
          array[Math.abs(dif - index + (index % 10) * 2 + m)] = {
            ...array[Math.abs(dif - index + (index % 10) * 2 + m)],
            color: state.currentColor
          };
          return array;
        } else if (brush === 'mirrorV') {
          const dif = size === 400 ? 20 : size === 1600 ? 40 : 10;
          array[index] = {
            ...array[index],
            color: state.currentColor
          };
          array[Math.abs(dif - 1 - (index % dif) + index - (index % dif))] = {
            ...array[Math.abs(dif - 1 - (index % dif) + index - (index % dif))],
            color: state.currentColor
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
              color: state.currentColor
            }
            : el
        );
      };

      copyField = brushFill(action.payload.index, state.brush, state.fieldSize, [
        ...state.field
      ]);
      return {
        ...state,
        field: copyField,
        historyColor: [...new Set(copyHistoryColor)]
      };

    // end draw brush
    case 'CLEAR_FIELD':
      return {
        ...state,
        field: new Array(state.fieldSize).fill({ color: '#ffffff' }),
        brush: 'dot'
      };
    case 'DELETE_COLOR_HISTORY':
      return {
        ...state,
        historyColor: ['#000000']
      };
    case 'CHANGE_FIELD_SIZE':
      if (action.payload.size === 100) {
        return {
          ...state,
          field: new Array(100).fill({ color: '#ffffff' }),
          fieldSize: 100,
          pixelSize: 10
        };
      }
      if (action.payload.size === 400) {
        return {
          ...state,
          field: new Array(400).fill({ color: '#ffffff' }),
          fieldSize: 400,
          pixelSize: 5
        };
      }
      if (action.payload.size === 1600) {
        return {
          ...state,
          field: new Array(1600).fill({ color: '#ffffff' }),
          fieldSize: 1600,
          pixelSize: 2.5
        };
      }
      return state;

    case 'CHANGE_BRUSH':
      return {
        ...state,
        brush: action.payload.brush
      };
    case 'SWITCH_COLOR':
      return {
        ...state
      };

    case 'ADD_DRAW_TO_HISTORY_SUCCESS':
      return {
        ...state,
        drawHistory: [...state.drawHistory, action.payload],
      };
    case 'GET_DRAW_FROM_HISTORY':
      return { ...state, ...state.drawHistory[action.payload.index] };

    case 'GET_DRAWS_FROM_SERVER':
      return {
        ...state,
        drawHistory: action.payload
      };

    case 'DELETE_DRAW_FROM_HISTORY':
      const copyDrawList = [...state.drawHistory].filter(
        (draw) => draw._id !== action.payload
      );
      return {
        ...state,
        drawHistory: copyDrawList
      };

    case 'FILL_RANDOM_BRUSH':
      const lnHistory = state.historyColor.length;
      const randomField = state.field.map((el) => ({
        ...el,
        color: state.historyColor[Math.floor(Math.random() * lnHistory)]
      }));
      return {
        ...state,
        field: randomField
      };
    case 'REGISTER_USER_SUCCESS':
    case 'LOGIN_USER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authError: null,
      };
    case 'REGISTER_USER_FAIL':
    case 'LOGIN_USER_FAIL':
      return {
        ...state,
        authError: action.payload,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        token: null,
        authError: null,
      };
    case 'REFRESH_TOKEN_SUCCESS':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

function fillParticip(arrJSON, current, size, max, oldColor, newColor) {
  console.log(current, size, oldColor);
  const a = JSON.parse(arrJSON);
  if (oldColor === newColor) return a;

  let next = [];
  const stop = [];

  function ch(current) {
    if (a[current] && a[current].color === oldColor) {
      a[current].color = newColor;
      stop.push(current);
      let up = current - size;
      let down = current + size;
      let left = current - 1;
      let right = current + 1;
      if (right % size === 0) {
        stop.push(right);
      }
      if (left % size === size - 1) {
        stop.push(left);
      }
      next.push(
        ...[up, down, left, right].filter(
          (e) => e >= 0 && !stop.includes(e) && !next.includes(e) && e <= max
        )
      );
    } else {
      stop.push(current);
    }
    next = next.filter((el) => el !== current);
    return next.length > 0 ? ch(next[0], size, newColor, max) : a;
  }

  return ch(current);
}

const horizontal = (index, size) => {
  if (size === 100) {
    const r1 = Math.floor(index / 10); // 9
    return [r1 * 10, r1 * 10 + 9];
  }
  if (size === 400) {
    const r2 = Math.floor(index / 20); // 9
    return [r2 * 20, r2 * 20 + 19];
  }
  if (size === 1600) {
    const r2 = Math.floor(index / 40); // 9
    return [r2 * 40, r2 * 40 + 39];
  }
};
const vertical = (index, size) => {
  const chList = [];
  let part = 10;
  if (size === 400) {
    part = 20;
  } else if (size === 1600) {
    part = 40;
  }
  const p1 = index % part;
  for (let i = 0; i < part; i++) {
    chList.push(p1 + i * part);
  }
  return chList;
};

export default drawField;
