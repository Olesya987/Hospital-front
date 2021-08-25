import React, { useEffect } from "react";
import { connect } from "react-redux";
import Add from "../Add/Add";
import AppGrid from "../AppGrid/AppGrid";
import "./Appointments.scss";

const Appointments = ({ onChangeAuthReg }) => {
  useEffect(() => {
    const login = localStorage.getItem("login");
    onChangeAuthReg({ text: "Приемы", login });
  }, []);

  return (
    <div className="appoint-main">
      <Add />
      <AppGrid />
    </div>
  );
};

export default connect(
  (state) => ({
    allState: state,
  }),
  (dispatch) => ({
    onChangeAuthReg: (newObj) => {
      dispatch({ type: "SET_AUTH_REG", newValue: newObj });
    },
  })
)(Appointments);
