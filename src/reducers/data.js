const initialState = [];

const funcFlag = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return action.newValue;

    default:
      return state;
  }
};

export default funcFlag;