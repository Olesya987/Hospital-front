import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

const Auth = ({ setAuthReg }) => {
  const history = useHistory();

  const [state, setState] = useState({
    open: false,
    text: "",
  });
  const [values, setValues] = useState({
    login: "",
    password: "",
    showPassword: false,
    showPasswordRepeat: false,
    passwordRepeat: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowPasswordRepeat = () => {
    setValues({ ...values, showPasswordRepeat: !values.showPasswordRepeat });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      open: false,
      text: "",
    });
  };

  const goToReg = () => {
    setAuthReg({
      text: "Зарегистрироваться в системе",
      login: "",
      token: "",
    });
    history.push("/registration");
  };

  return (
    <div>
      <h2>Войти в систему</h2>
      <form>
        <div>
          <label>Login:</label>
          <input type="text" id="input-login" name="input-login" />
          <label>Password:</label>
          <input type="text" id="input-password" name="input-password" />
        </div>
        <button>Войти</button>
      </form>
      <a onClick={() => goToReg()}>Зарегистрироваться</a>
    </div>
  );
};

export default Auth;
