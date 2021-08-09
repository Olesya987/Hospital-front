import React, { useState } from "react";
import icon from "./images/icon.png";
import Auth from "./Auth";
import Reg from "./Reg";
import Appointments from "./appointments";
import "./App.scss";
import medical from "./images/medical-2.png";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

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
            {/* <h4>{history.pop()}</h4> */}
            <Button variant="outlined" color="primary" type="none">
              Выйти
            </Button>
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
