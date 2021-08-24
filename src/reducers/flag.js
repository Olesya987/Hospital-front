const initialState = true;

const funcFlag = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FLAG":
      return !state;

    default:
      return state;
  }
};

export default funcFlag;
