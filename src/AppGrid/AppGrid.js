import React, { useState, useEffect } from "react";
import axios from "axios";
import { TablePagination } from "@material-ui/core";
import ModalDel from "../ModalDel/ModalDel";
import ModalEdit from "../ModalEdit/ModalEdit";
import Sort from "../Sort/Sort";
import Filter from "../Filter/Filter";
import TableApp from "../TableApp/TableApp";
import "./AppGrid.scss";

const AppGrid = ({ setData, data, flag, reFlag }) => {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState({
    currentPage: 1,
    rowsOnPage: 5,
    allRows: 0,
  });
  const { allRows, rowsOnPage, currentPage } = pages;
  const [date, setDate] = useState({
    before: "0000-00-00",
    after: "9999-99-99",
  });
  const [isFilter, setIsFilter] = useState(false);
  const [sortItem, setSortItem] = useState({
    value: "",
    direction: "asc",
  });
  const [delProps, setDelProps] = useState({
    open: false,
    id: "",
  });
  const [editProps, setEditProps] = useState({
    open: false,
    changeRow: {},
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { before, after } = date;
    const { value, direction } = sortItem;
    // setCharacters([]);
    axios
      .post(
        `http://localhost:8080/appointment/get`,
        isFilter
          ? {
              currentPage,
              rowsOnPage,
              before,
              after,
              value,
              direction,
            }
          : { currentPage, rowsOnPage, value, direction },
        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        const { appointments, allRows } = res.data;
        const arr = [];
        if (appointments.length !== 0) {
          for (let key in appointments[0]) {
            if (key !== "_id") arr.push({ immediately: key });
          }
          arr.push({ immediately: "" });
          for (let i = 0; i < arr.length; i++) {
            switch (arr[i].immediately) {
              case "name":
                arr[i].translate = "Имя";
                break;
              case "docName":
                arr[i].translate = "Врач";
                break;
              case "date":
                arr[i].translate = "Дата";
                break;
              case "complaints":
                arr[i].translate = "Жалобы";
                break;

              default:
                arr[i].translate = arr[i].immediately;
                break;
            }
          }
        }
        setCharacters(arr);
        setData(appointments);
        setPages({ ...pages, allRows });
        if (
          currentPage > Math.ceil(allRows / rowsOnPage) &&
          appointments.length !== 0
        ) {
          setPages({ ...pages, currentPage: 1 });
          reFlag();
        }
      });
  }, [flag, isFilter, currentPage, rowsOnPage, sortItem, reFlag]);

  const handleSaveChangesModalEdit = (data) => {
    reFlag();
    handleCloseModalEdit();
  };

  const handleCloseModalEdit = () => {
    setEditProps({
      open: false,
      changeRow: {},
    });
  };

  const changeEditProps = (flag, changeRow) => {
    setEditProps({
      open: flag,
      changeRow,
    });
  };

  const handleSaveChangesModalDel = (data) => {
    reFlag();
    handleCloseModalDel();
  };

  const handleCloseModalDel = () => {
    setDelProps({
      open: false,
      changeRow: {},
    });
  };

  const changeDelProps = (flag, id) => {
    setDelProps({
      open: flag,
      id,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPages({ ...pages, currentPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    setPages({ ...pages, rowsOnPage: parseInt(event.target.value, 10) });
  };

  const resetSort = (e, name) => {
    if (name === "direction") {
      if (e.target.value.length !== 0) {
        setSortItem({ ...sortItem, [name]: e.target.value });
      } else {
        setSortItem({ value: "", [name]: "asc" });
      }
    } else {
      setSortItem({ [name]: e.target.value, direction: "asc" });
    }
    reFlag();
  };

  const resetFilter = (e, name) => {
    if (e.target.value) {
      setDate({ ...date, [name]: e.target.value });
    } else {
      name === "before"
        ? setDate({ ...date, [name]: "0000-00-00" })
        : name === "after" && setDate({ ...date, [name]: "9999-99-99" });
    }
  };

  const filterCheck = () => {
    const flag = date.before <= date.after;
    setIsFilter(flag);
    flag && reFlag();
    return flag;
  };

  const cleaning = () => {
    setDate({
      before: "0000-00-00",
      after: "9999-99-99",
    });
    reFlag();
  };

  return (
    <div>
      <Sort characters={characters} sortItem={sortItem} resetSort={resetSort} />
      <Filter
        date={date}
        resetFilter={resetFilter}
        filterCheck={filterCheck}
        cleaning={cleaning}
      />
      <div className="main-table">
        <div className="table-size">
          <TableApp
            data={data}
            characters={characters}
            changeDelProps={changeDelProps}
            changeEditProps={changeEditProps}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={allRows}
            rowsPerPage={rowsOnPage}
            page={currentPage - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        {delProps.open && (
          <ModalDel
            {...delProps}
            onCloseModalDel={handleCloseModalDel}
            onSaveChangesModal={handleSaveChangesModalDel}
          />
        )}
        {editProps.open && (
          <ModalEdit
            {...editProps}
            onCloseModalEdit={handleCloseModalEdit}
            onSaveChangesModal={handleSaveChangesModalEdit}
          />
        )}
      </div>
    </div>
  );
};

export default AppGrid;
