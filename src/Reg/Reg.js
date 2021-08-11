import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import "./Reg.scss";

const Reg = ({ setAuthReg }) => {
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
  const checkPass = () => {
    const regexp = /((?=.*[0-9])(?=.*[a-zA-Z]).{6,})/g;
    return regexp.test(values.password) && !/[а-яА-Я]/.test(values.password);
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

  const goToAuth = () => {
    localStorage.setItem(
      "info",
      JSON.stringify({
        text: "Вход в систему",
        login: "",
        token: "",
        flag: false,
      })
    );
    setAuthReg(JSON.parse(localStorage.getItem("info")));
    history.push("/authorization");
  };

  const subUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      formData.get("input-login").length >= 6 &&
      checkPass() &&
      values.password === values.passwordRepeat
    ) {
      await axios
        .post("http://localhost:8080/user/post", {
          login: formData.get("input-login"),
          password: formData.get("input-password"),
        })
        .then((res) => {
          const { login, token } = res.data;
          history.push(`/appointments`);
          localStorage.setItem(
            "info",
            JSON.stringify({
              text: "Приемы",
              flag: true,
              login,
              token,
            })
          );
          setAuthReg(JSON.parse(localStorage.getItem("info")));
          setValues({
            login: "",
            password: "",
            showPassword: false,
            showPasswordRepeat: false,
            passwordRepeat: "",
          });
        })
        .catch((err) => {
          if (err.response.status === 421) {
            setState({
              open: true,
              text: "Пользователь с таким логином уже зарегистрирован",
            });
          }
        });
    } else {
      setState({
        open: true,
        text: "Вводимые значения некорректны, длина строк должна быть не меньше 6, в пароле должны присутствовать цифры и латинские символы",
      });
    }
  };

  return (
    <div className="main-reg-field">
      <h2>Регистрация</h2>
      <form onSubmit={subUser}>
        <div className="input-form-reg">
          <div className="reg-div-login">
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

          <FormControl className="margin textField" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password-repeat">
              Repeat password
            </InputLabel>
            <OutlinedInput
              id="input-password-repeat"
              name="input-password-repeat"
              type={values.showPasswordRepeat ? "text" : "password"}
              value={values.passwordRepeat}
              onChange={handleChange("passwordRepeat")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password repeat visibility"
                    onClick={handleClickShowPasswordRepeat}
                    edge="end"
                  >
                    {values.showPasswordRepeat ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={128}
            />
          </FormControl>
        </div>

        <Button variant="outlined" color="primary" type="none">
          Зарегистрироваться
        </Button>
        <div className="reg-text" onClick={() => goToAuth()}>
          Авторизоваться
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

export default Reg;
