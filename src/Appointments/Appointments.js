import React, { useState, useEffect } from "react";
import Add from "../Add/Add";
import AppGrid from "../AppGrid/AppGrid";
import "./Appointments.scss";

const Appointments = ({ setAuthReg }) => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const login = localStorage.getItem("login");
    setAuthReg({ text: "Приемы", login });
  }, []);

  return (
    <div className="appoint-main">
      <Add setData={setData} setFlag={setFlag} />
      <AppGrid setData={setData} data={data} setFlag={setFlag} flag={flag} />
    </div>
  );
};

export default Appointments;
