import React, { useState } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Auth from "./Auth/Auth";
import Reg from "./Reg/Reg";
import Appointments from "./Appointments/Appointments";
import icon from "./source/images/icon.png";
import "./App.scss";

function App() {
  const [authReg, setAuthReg] = useState({});

  const goToAuth = () => {
    localStorage.clear();
    setAuthReg({ text: "Вход в систему", login: "" });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img className="App-logo" src={icon} alt="logo"></img>
          <h1>{authReg.text}</h1>
        </div>

        {authReg.login && (
          <div>
            <h4>{authReg.login}</h4>
            <Link to="/authorization">
              <Button
                variant="outlined"
                color="primary"
                type="none"
                onClick={() => goToAuth()}
              >
                Выйти
              </Button>
            </Link>
          </div>
        )}
      </header>

      <Switch>
        <Route path="/authorization">
          <Auth setAuthReg={setAuthReg} />
        </Route>
        <Route path="/registration">
          <Reg setAuthReg={setAuthReg} />
        </Route>
        <Route path="/appointments">
          <Appointments setAuthReg={setAuthReg} />
        </Route>
        <Redirect from="/" to="/authorization" />
      </Switch>
    </div>
  );
}

export default App;
