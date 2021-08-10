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
import "./Auth.scss";

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
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
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

  const checkUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      formData.get("input-login").length != 0 &&
      formData.get("input-password").length != 0
    ) {
      console.log(values.login);
      await axios
        .post("http://localhost:8080/user/get", {
          login: values.login,
          password: values.password,
        })
        .then((res) => {
          const { login, token } = res.data;
          history.push(`/appointments`);
          setAuthReg({
            text: "Приемы",
            flag: true,
            login,
            token,
          });
          setValues({
            login: "",
            password: "",
            showPassword: false,
            showPasswordRepeat: false,
            passwordRepeat: "",
          });
        })
        .catch((err) => {
          if (err.response.status === 450) {
            console.log(values.login);
            setState({
              open: true,
              text: "Пользователя с таким логином не существует",
            });
          }
          if (err.response.status === 440) {
            setState({
              open: true,
              text: "Введен неверный пароль",
            });
          }
        });
    } else {
      setState({
        open: true,
        text: "Вводимые значения некорректны, должны быть заполнены все поля",
      });
    }
  };

  return (
    <div className="main-auth-fild">
      <h2>Войти в систему</h2>
      <form onSubmit={checkUser}>
        <div className="input-form-auth">
          <div className="auth-div-login">
            <TextField
              id="input-login"
              name="input-login"
              label="Login"
              type="text"
              variant="outlined"
              value={values.login}
              onChange={handleChange("login")}
            />
          </div>

          <FormControl className="root margin textField" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="input-password"
              name="input-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </div>

        <Button variant="outlined" color="primary" type="none">
          Войти
        </Button>
        <div className="auth-text" onClick={() => goToReg()}>
          Зарегистрироваться
        </div>
      </form>

      <Snackbar
        open={state.open}
        autoHideDuration={13000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        enqueueSnackbar="error"
        action={
          <React.Fragment>
            <CloseIcon color="secondary" onClick={handleClose} />
          </React.Fragment>
        }
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          {state.text}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Auth;