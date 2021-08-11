import React, { useState } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Auth from "./Auth/Auth";
import Reg from "./Reg/Reg";
import Appointments from "./Appointments/Appointments";
import icon from "./source/images/icon.png";
import medical from "./source/images/medical-2.png";
import "./App.scss";

function App() {
  const [authReg, setAuthReg] = useState(
    JSON.parse(localStorage.getItem("info")) || {
      text: "Вход в систему",
      flag: false,
      login: "",
      token: "",
    }
  );

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img className="App-logo" src={icon} alt='logo'></img>
          <h1>{authReg.text}</h1>
        </div>

        {authReg.flag && (
          <div>
            
            <h4>{authReg.login}</h4>
            <Link to="/authorization">
              <Button
                variant="outlined"
                color="primary"
                type="none"
                onClick={() => {
                  localStorage.setItem(
                    "info",
                    JSON.stringify({
                      text: "Вход в систему",
                      flag: false,
                      login: "",
                      token: "",
                    })
                  );
                  setAuthReg(JSON.parse(localStorage.getItem("info")));
                }}
              >
                Выйти
              </Button>
            </Link>
          </div>
        )}
      </header>
      <div className="main-reg">
        {!authReg.flag && <img className="img-start" src={medical} alt='design' />}

        <Switch>
          <Route path="/authorization">
            <Auth setAuthReg={setAuthReg} />
          </Route>
          <Route path="/registration">
            <Reg setAuthReg={setAuthReg} />
          </Route>
          <Route path="/appointments">
            <Appointments />
          </Route>
          <Redirect from="/" to="/authorization" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
