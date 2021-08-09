import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

const Auth = ({ setAuthReg }) => {
  const history = useHistory();
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
      <a
        onClick={() => {
          setAuthReg({
            text: "Зарегистрироваться в системе",
          });
          history.push("/registration");
        }}
      >
        Зарегистрироваться
      </a>
    </div>
  );
};

export default Auth;
