const initialState = [];

const funcValues = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHARACTERS":
      return action.newValue;
    
    default:
      return state;
  }
};

export default funcValues;