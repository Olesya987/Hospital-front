const initialState = false;

const funcValues = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.newValue;

    default:
      return state;
  }
};

export default funcValues;
