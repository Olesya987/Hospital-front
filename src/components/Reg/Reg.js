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
import "./Reg.scss";

const Reg = ({
  allState,
  onChangeAuthReg,
  onChangeValues,
  onChangeOneValue,
  onChangeStateWar,
}) => {
  const { values, state } = allState;
  const history = useHistory();

  useEffect(() => {
    onChangeAuthReg({ text: "Зарегистрироваться в системе", login: "" });
  }, []);

  const checkPass = () => {
    const regexp = /((?=.*[0-9])(?=.*[a-zA-Z]).{6,})/g;
    return regexp.test(values.password) && !/[а-яА-Я]/.test(values.password);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onChangeStateWar({
      open: false,
      text: "",
    });
  };

  const goToAuth = () => {
    onChangeAuthReg({ text: "Вход в систему", login: "" });
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
          localStorage.setItem("token", token);
          localStorage.setItem("login", login);
          onChangeAuthReg({ text: "Приемы", login });
          onChangeValues({
            login: "",
            password: "",
            showPassword: false,
            showPasswordRepeat: false,
            passwordRepeat: "",
          });
          history.push(`/appointments`);
        })
        .catch((err) => {
          if (err.response.status === 421) {
            onChangeStateWar({
              open: true,
              text: "Пользователь с таким логином уже зарегистрирован",
            });
          }
        });
    } else {
      onChangeStateWar({
        open: true,
        text: "Вводимые значения некорректны, длина строк должна быть не меньше 6, в пароле должны присутствовать цифры и латинские символы",
      });
    }
  };

  return (
    <div className="main-reg">
      <img className="img-start" src={medical} alt="design" />
      <div className="main-reg-field">
        <h2>Регистрация</h2>
        <form onSubmit={(e) => subUser(e)}>
          <div className="input-form-reg">
            <div className="reg-div-login">
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

            <FormControl className="margin textField" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password-repeat">
                Repeat password
              </InputLabel>
              <OutlinedInput
                id="input-password-repeat"
                name="input-password-repeat"
                type={values.showPasswordRepeat ? "text" : "password"}
                value={values.passwordRepeat}
                onChange={(e) =>
                  onChangeOneValue(e.target.value, "passwordRepeat")
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password repeat visibility"
                      onClick={() =>
                        onChangeOneValue(
                          !values.showPasswordRepeat,
                          "showPasswordRepeat"
                        )
                      }
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
)(Reg);
