import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import "./Reg.scss";
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
    if (regexp.test(values.password)) flag3 = true;
    if (/[а-яА-Я]/.test(values.password)) flag1 = false;

    return flag1 && flag3;
  };

  const goToAuth = () => {
    setAuthReg({
      text: "Вход в систему",
    });

    history.push("/authorization");
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
          setUser({
            login: res.data.login,
            token: res.data.token,
          });
          history.push(`/appointments/${res.data.login}`);
          setAuthReg({
            text: "Приемы",
            flag: true,
          });
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
        })
        .catch((err) => {
          if (err.response.status === 421) {
            alert("Пользователь с таким логином уже зарегистрирован");
          }
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
    </div>
  );
};

export default Reg;
