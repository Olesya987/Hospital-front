const initialState = {};

const funcData = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH_REG":
      return action.newValue;

    default:
      return state;
  }
};

export default funcData;
