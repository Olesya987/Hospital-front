import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
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
import medical from "../../source/images/medical-2.png";
import "./Auth.scss";

const Auth = ({
  allState,
  onChangeAuthReg,
  onChangeStateWar,
  onChangeValues,
  onChangeOneValue,
}) => {
  const { state, values } = allState;
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onChangeStateWar({
      open: false,
      text: "",
    });
  };

  useEffect(() => {
    onChangeAuthReg({ text: "Вход в систему", login: "" });
  }, []);

  const goToReg = () => {
    onChangeAuthReg({ text: "Зарегистрироваться в системе", login: "" });
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
          onChangeAuthReg({ text: "Приемы", login });
          onChangeValues({
            login: "",
            password: "",
            showPassword: false,
          });
          history.push(`/appointments`);
        })
        .catch((err) => {
          onChangeStateWar({
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
      onChangeStateWar({
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
                onChange={(e) => onChangeOneValue(e.target.value, "login")}
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
                onChange={(e) => onChangeOneValue(e.target.value, "password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        onChangeOneValue(!values.showPassword, "showPassword")
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

export default connect(
  (state) => ({
    allState: state,
  }),
  (dispatch) => ({
    onChangeAuthReg: (newObj) => {
      dispatch({ type: "SET_AUTH_REG", newValue: newObj });
    },
    onChangeStateWar: (newObj) => {
      dispatch({ type: "SET_STATE_WAR", newValue: newObj });
    },
    onChangeValues: (newObj) => {
      dispatch({ type: "SET_ALL_VALUES", newValue: newObj });
    },
    onChangeOneValue: (val, name) => {
      dispatch({ type: "SET_VALUE", newValue: val, name });
    },
  })
)(Auth);
