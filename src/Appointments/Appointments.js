import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

const Appointments = ({ setAuthReg }) => {
  const history = useHistory();
  return (
    <div>
      
      {/* <form>
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
      </a> */}
    </div>
  );
};

export default Appointments;