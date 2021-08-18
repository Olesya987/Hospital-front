import React, { useState, useEffect } from "react";
import Add from "../Add/Add";
import AppGrid from "../AppGrid/AppGrid";
import Sort from "../Sort/Sort";
import Filter from "../Filter/Filter";
import "./Appointments.scss";

const Appointments = ({ setAuthReg }) => {
  const [data, setData] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [flag, setFlag] = useState(true);
  const [isChange, setChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsOnPage, setRowsOnPage] = useState(5);
  const [allRows, setAllRows] = useState(0);
  const [date, setDate] = useState({
    before: "0000-00-00",
    after: "9999-99-99",
  });
  const [sortItem, setSortItem] = useState({
    value: "",
    sort: "asc",
  });

  const reFlag = () => setFlag(!flag);

  const reChange = () => setChange(!isChange);

  const props = {
    setData,
    data,
    reFlag,
    flag,
    characters,
    setCharacters,
    reChange,
    isChange,
    currentPage,
    setCurrentPage,
    rowsOnPage,
    setRowsOnPage,
    allRows,
    setAllRows,
    date,
    setDate,
    sortItem,
    setSortItem
  };

  useEffect(() => {
    const login = localStorage.getItem("login");
    setAuthReg({ text: "Приемы", login });
  }, []);

  return (
    <div className="appoint-main">
      <Add setFlag={setFlag} flag={flag} />
      <Sort {...props} />
      <Filter {...props} />
      <AppGrid {...props} />
    </div>
  );
};

export default Appointments;
