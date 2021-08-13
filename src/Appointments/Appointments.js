import React, { useState, useEffect } from "react";
import Add from "../Add/Add";
import AppGrid from "../AppGrid/AppGrid";
import Sort from "../Sort/Sort";
import "./Appointments.scss";

const Appointments = ({ setAuthReg }) => {
  const [data, setData] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const login = localStorage.getItem("login");
    setAuthReg({ text: "Приемы", login });
  }, []);

  return (
    <div className="appoint-main">
      <Add setData={setData} setFlag={setFlag} />
      <Sort
        data={data}
        setData={setData}
        characters={characters}
        setFlag={setFlag}
      />
      <AppGrid
        setData={setData}
        data={data}
        setFlag={setFlag}
        flag={flag}
        characters={characters}
        setCharacters={setCharacters}
      />
    </div>
  );
};

export default Appointments;
