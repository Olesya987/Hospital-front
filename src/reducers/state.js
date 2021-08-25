const initialState={};

const funcState = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STATE_WAR":
      return action.newValue;

    default:
      return state;
  }
};

export default funcState;