import React, { useState, useEffect } from "react";
import Add from "../Add/Add";
import AppGrid from "../AppGrid/AppGrid";
import Sort from "../Sort/Sort";
import Filter from "../Filter/Filter";
import "./Appointments.scss";

const Appointments = ({ setAuthReg }) => {
  const [data, setData] = useState([]);
  const [length, setLength] = useState(data.length);
  const [characters, setCharacters] = useState([]);
  const [flag, setFlag] = useState(true);
  const [isChange, setChange] = useState(false);
  const [allRows, setAllRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsOnPage, setRowsOnPage] = useState(5);

  useEffect(() => {
    const login = localStorage.getItem("login");
    setAuthReg({ text: "Приемы", login });
  }, []);

  return (
    <div className="appoint-main">
      <Add setFlag={setFlag} flag={flag} />
      <Sort
        setData={setData}
        characters={characters}
        setFlag={setFlag}
        isChange={isChange}
        currentPage={currentPage}
        rowsOnPage={rowsOnPage}
      />
      <Filter
        data={data}
        setData={setData}
        setFlag={setFlag}
        setLength={setLength}
        length={length}
        allRows={allRows}
        currentPage={currentPage}
        rowsOnPage={rowsOnPage}
      />
      <AppGrid
        setData={setData}
        data={data}
        setFlag={setFlag}
        flag={flag}
        characters={characters}
        setCharacters={setCharacters}
        setChange={setChange}
        isChange={isChange}
        allRows={allRows}
        setAllRows={setAllRows}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsOnPage={rowsOnPage}
        setRowsOnPage={setRowsOnPage}
      />
    </div>
  );
};

export default Appointments;
