import React, { useEffect, useState } from "react";
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
import medical from "../source/images/medical-2.png";
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      open: false,
      text: "",
    });
  };

  useEffect(() => {
    setAuthReg({ text: "Вход в систему", login: "" });
  }, []);

  const goToReg = () => {
    setAuthReg({ text: "Зарегистрироваться в системе", login: "" });

    history.push("/registration");
  };

  const checkUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      formData.get("input-login").length !== 0 &&
      formData.get("input-password").length !== 0
    ) {
      const { login, password } = values;
      await axios
        .post("http://localhost:8080/user/get", {
          login,
          password,
        })
        .then((res) => {
          const { login, token } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("login", login);
          setAuthReg({ text: "Приемы", login });
          setValues({
            login: "",
            password: "",
            showPassword: false,
            showPasswordRepeat: false,
            passwordRepeat: "",
          });
          history.push(`/appointments`);
        })
        .catch((err) => {
          setState({
            open: true,
            text:
              err.response.status === 450
                ? "Пользователя с таким логином не существует"
                : err.response.status === 440
                ? "Введен неверный пароль"
                : "",
          });
        });
    } else {
      setState({
        open: true,
        text: "Вводимые значения некорректны, должны быть заполнены все поля",
      });
    }
  };

  return (
    <div className="main-auth">
      <img className="img-start" src={medical} alt="design" />
      <div className="main-auth-field">
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
                onChange={(e) =>
                  setValues({ ...values, login: e.target.value })
                }
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
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setValues({
                          ...values,
                          showPassword: !values.showPassword,
                        })
                      }
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
          onClose={() => handleClose()}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          enqueueSnackbar="error"
          action={
            <React.Fragment>
              <CloseIcon color="secondary" onClick={() => handleClose()} />
            </React.Fragment>
          }
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => handleClose()}
            severity="error"
          >
            {state.text}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Auth;
