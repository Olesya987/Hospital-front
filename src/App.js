import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Auth from "./components/Auth/Auth";
import Reg from "./components/Reg/Reg";
import Appointments from "./components/Appointments/Appointments";
import Person from "./components/Person/Person";
import icon from "./source/images/icon.png";
import "./App.scss";

function App({ allState, onChangeAuthReg }) {
  const { authReg } = allState;
  const goToAuth = () => {
    localStorage.clear();
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
            {authReg.text === "Приемы" && (
              <Link className="person-link" to={`/person/${localStorage.getItem("login")}`}>
                <h4>{authReg.login}</h4>
              </Link>
            )}
            {authReg.text === "Личный кабинет" && (
              <Link to="/appointments">
                <Button
                  variant="outlined"
                  color="primary"
                  type="none"
                >
                  Приемы
                </Button>
              </Link>
            )}
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
        <Route path="/person/:login">
          <Person />
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
