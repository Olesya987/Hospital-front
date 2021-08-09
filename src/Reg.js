import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import {
  alpha,
  ThemeProvider,
  withStyles,
  makeStyles,
  createTheme,
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

const Reg = ({ setAuthReg }) => {
  const history = useHistory();

  const [user, setUser] = useState({});
  const [passCorrect, setPass] = useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(1),
    },
    textField: {
      width: "auto",
    },
  }));

  const classes = useStyles();
  const [values, setValues] = React.useState({
    login: "",
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
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
    let flag1 = true;
    let flag3 = false;
    const regexp = /((?=.*[0-9])(?=.*[a-zA-Z]).{6,})/g;
    if (regexp.test(values.password)) {
      flag3 = true;
    }
    if (/[а-яА-Я]/.test(values.password)) flag1 = false;

    return flag1 && flag3;
  };

  const subUser = async (e) => {
    e.preventDefault();
    console.log(checkPass());
    const formData = new FormData(e.target);
    if (
      formData.get("input-login").length >= 6 &&
      checkPass() &&
      values.password.length >= 6 &&
      values.password === values.passwordRepeat
    ) {
      await axios
        .post("http://localhost:8080/user/post", {
          login: formData.get("input-login"),
          password: formData.get("input-password"),
        })
        .then((res) => {
          history.push(`/appointments/${res.data.login}`)
          setUser(res.data);
          setAuthReg({
            text: "Приемы",
            flag:true,
          });
        });
      // e.target.reset();
      setValues({
        login: "",
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false,
        showPasswordRepeat: false,
        passwordRepeat: "",
      });
    } else {
      alert(
        "Вводимые значения некорректны, длина строк должна быть не меньше 6, в пароле должны присутствовать цифры и латинские символы"
      );
    }
  };

  return (
    <div className="main-reg-fild">
      <h2>Регистрация</h2>
      <form onSubmit={subUser}>
        <div className="input-form-reg">
          {/* <label>Login:</label>
          <input type="text" id="input-login" name="input-login" />
          <label>Password:</label>
          <input type="text" id="input-password" name="input-password" />
          <label>Repeat password:</label>
          <input
            type="text"
            id="input-password-repeat"
            name="input-password-repeat"
          /> */}
          <div style={{ margin: "8px" }}>
            <TextField
              id="input-login"
              name="input-login"
              label="Login"
              type="text"
              variant="outlined"
              style={{ width: "100%" }}
              value={values.login}
              onChange={handleChange("login")}
            />
          </div>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
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
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
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
                    // onMouseDown={handleMouseDownPasswordRepeat}
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
        {/* <button>Зарегистрироваться</button> */}
        <div
          className="reg-text"
          onClick={() => {
            setAuthReg({
              text: "Вход в систему",
            });
            
            history.push("/authorization");
          }}
        >
          Авторизоваться
        </div>
      </form>
    </div>
  );
};

export default Reg;
