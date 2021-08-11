import React, { useState } from "react";
import Sort from "../Sort/Sort";
import AppGrid from "../AppGrid/AppGrid";
import "./Appointments.scss";
const Appointments = () => {
  const [data, setData] = useState([]);
  return (
    <div className="appoint-main">
      <Sort setData={setData} />
      <AppGrid setData={setData} data={data} />
    </div>
  );
};

export default Appointments;
