const initialState = {
  value: "",
  direction: "asc",
};

const funcValues = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SORT":
      if (action.name === "direction") {
        if (action.newValue.length) {
          return { ...state, [action.name]: action.newValue };
        } else {
          return { value: "", [action.name]: "asc" };
        }
      } else {
        return { [action.name]: action.newValue, direction: "asc" };
      }

    default:
      return state;
  }
};

export default funcValues;
