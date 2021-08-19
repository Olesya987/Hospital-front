import React, { useState, useEffect, useCallback } from "react";
import Add from "../Add/Add";
import AppGrid from "../AppGrid/AppGrid";
import "./Appointments.scss";

const Appointments = ({ setAuthReg }) => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);

  const reFlag = useCallback(() => setFlag(!flag), [flag]);

  const props = {
    setData,
    data,
    reFlag,
    flag,
  };

  useEffect(() => {
    const login = localStorage.getItem("login");
    setAuthReg({ text: "Приемы", login });
  }, [setAuthReg]);

  return (
    <div className="appoint-main">
      <Add reFlag={reFlag} />
      <AppGrid {...props} />
    </div>
  );
};

export default Appointments;
