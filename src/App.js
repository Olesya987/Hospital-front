import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Auth from "./Auth/Auth";
import Reg from "./Reg/Reg";
import Appointments from "./Appointments/Appointments";
import icon from "./source/images/icon.png";
import medical from "./source/images/medical-2.png";
import "./App.scss";

function App() {
  const history = useHistory();
  const [authReg, setAuthReg] = useState({
    text: "Вход в систему",
    flag: false,
  });
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={icon}></img>
        <h1>{authReg.text}</h1>
        {authReg.flag ? (
          <div>
            {/* <h4>{window.location.pathname+""}</h4> */}
            <Link to="/authorization">
              <Button
                variant="outlined"
                color="primary"
                type="none"
                onClick={() => {
                  setAuthReg({
                    text: "Вход в систему",
                    flag: false,
                  });
                }}
              >
                Выйти
              </Button>
            </Link>
          </div>
        ) : (
          <div />
        )}
      </header>
      <div className="main-reg">
        <img className="img-start" src={medical}></img>

        <Switch>
          <Route path="/authorization">
            <Auth setAuthReg={setAuthReg} />
          </Route>
          <Route path="/registration">
            <Reg setAuthReg={setAuthReg} />
          </Route>
          <Route path="/appointments/:login">
            <Appointments setAuthReg={setAuthReg} />
          </Route>
          <Redirect from="/" to="/authorization" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
