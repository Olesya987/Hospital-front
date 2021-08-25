import React, { useState } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Auth from "./Auth/Auth";
import Reg from "./Reg/Reg";
import Appointments from "./Appointments/Appointments";
import icon from "./source/images/icon.png";
import "./App.scss";

function App({ allState, onChangeAuthReg }) {
  const goToAuth = () => {
    localStorage.clear();
    onChangeAuthReg({ text: "Вход в систему", login: "" });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img className="App-logo" src={icon} alt="logo"></img>
          <h1>{allState.authReg.text}</h1>
        </div>

        {allState.authReg.login && (
          <div>
            <h4>{allState.authReg.login}</h4>
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
          <Auth />
        </Route>
        <Route path="/registration">
          <Reg />
        </Route>
        <Route path="/appointments">
          <Appointments />
        </Route>
        <Redirect from="/" to="/authorization" />
      </Switch>
    </div>
  );
}

export default connect(
  (state) => ({
    allState: state,
  }),
  (dispatch) => ({
    onChangeAuthReg: (newObj) => {
      dispatch({ type: "SET_AUTH_REG", newValue: newObj });
    },
  })
)(App);
