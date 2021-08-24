import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { TablePagination } from "@material-ui/core";
import ModalDel from "../ModalDel/ModalDel";
import ModalEdit from "../ModalEdit/ModalEdit";
import Sort from "../Sort/Sort";
import Filter from "../Filter/Filter";
import TableApp from "../TableApp/TableApp";
import "./AppGrid.scss";

const AppGrid = ({
  allState,
  onChangeData,
  onChangeCharacters,
  reFlag,
}) => {
  const [pages, setPages] = useState({
    currentPage: 1,
    rowsOnPage: 5,
    allRows: 0,
  });
  const { allRows, rowsOnPage, currentPage } = pages;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { before, after } = allState.date;
    const { value, direction } = allState.sortItem;
    axios
      .post(
        `http://localhost:8080/appointment/get`,
        allState.isFilter
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
        onChangeCharacters(arr);
        onChangeData(appointments);
        setPages({ ...pages, allRows });
        if (
          currentPage > Math.ceil(allRows / rowsOnPage) &&
          !appointments.length
        ) {
          setPages({ ...pages, currentPage: 1 });
          reFlag();
        }
      });
  }, [
    allState.flag,
    allState.isFilter,
    currentPage,
    rowsOnPage,
    allState.sortItem,
    reFlag,
  ]);

  const handleChangePage = (event, newPage) => {
    setPages({ ...pages, currentPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    setPages({ ...pages, rowsOnPage: parseInt(event.target.value, 10) });
  };

  return (
    <div>
      <Sort />
      <Filter />
      <div className="main-table">
        <div className="table-size">
          <TableApp />
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
        {allState.modalProps.id && allState.modalProps.open && <ModalDel />}
        {allState.modalProps.changeRow && allState.modalProps.open && (
          <ModalEdit />
        )}
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    allState: state,
  }),
  (dispatch) => ({
    onChangeCharacters: (arr) => {
      dispatch({ type: "SET_CHARACTERS", newValue: arr });
    },
    reFlag: () => {
      dispatch({ type: "SET_FLAG" });
    },
    onChangeData: (arr) => {
      dispatch({ type: "SET_DATA", newValue: arr });
    },
    onChangeAllDate: (newObj) => {
      dispatch({ type: "SET_DATE", newValue: newObj });
    },
    onChangeModal: (obj) => {
      dispatch({ type: "SET_ALL_PROPS", newValue: obj });
    },
  })
)(AppGrid);
