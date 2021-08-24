const initialState = {
  before: "0000-00-00",
  after: "9999-99-99",
};

const funcValues = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATE":
      return action.newValue;
    case "SET_ONE_DATE":
      let d = action.newValue;
      if (!action.newValue) {
        if (action.name === "before") {
          d = "0000-00-00";
        } else d = "9999-99-99";
      }
      return { ...state, [action.name]: d };
    default:
      return state;
  }
};

export default funcValues;
