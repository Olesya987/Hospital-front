import React, { useState } from "react";
import Add from "../Add/Add";
import AppGrid from "../AppGrid/AppGrid";
import "./Appointments.scss";

const Appointments = () => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);
  
  return (
    <div className="appoint-main">
      <Add setData={setData} setFlag={setFlag} />
      <AppGrid setData={setData} data={data} setFlag={setFlag} flag={flag} />
    </div>
  );
};

export default Appointments;
