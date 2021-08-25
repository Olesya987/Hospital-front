const initialState = {
  login: "",
  password: "",
  showPassword: false,
  showPasswordRepeat: false,
  passwordRepeat: "",
};

const funcValues = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_VALUES":
      return action.newValue;
    case "SET_VALUE":
      return {
        ...state,
        [action.name]: action.newValue,
      };

    default:
      return state;
  }
};

export default funcValues;
