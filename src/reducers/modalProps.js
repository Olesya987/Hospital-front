const initialState = {
  open: false,
  id: "",
  changeRow: {},
};

const funcValues = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_PROPS":
      return action.newValue;

    default:
      return state;
  }
};

export default funcValues;
