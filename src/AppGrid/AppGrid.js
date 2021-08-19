import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ModalDel from "../ModalDel/ModalDel";
import ModalEdit from "../ModalEdit/ModalEdit";
import Sort from "../Sort/Sort";
import Filter from "../Filter/Filter";
import "./AppGrid.scss";

const AppGrid = ({ setData, data, flag, reFlag }) => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsOnPage, setRowsOnPage] = useState(5);
  const [allRows, setAllRows] = useState(0);
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
        setAllRows(allRows);
        if (currentPage > Math.ceil(allRows / rowsOnPage)) {
          setCurrentPage(1);
          reFlag();
        }
      });
  }, [flag]);

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

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
    reFlag();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsOnPage(parseInt(event.target.value, 10));
    reFlag();
  };

  return (
    <div>
      <Sort
        characters={characters}
        reFlag={reFlag}
        sortItem={sortItem}
        setSortItem={setSortItem}
      />
      <Filter reFlag={reFlag} date={date} setDate={setDate} setIsFilter={setIsFilter} />
      <div className="main-table">
        <div className="table-size">
          <TableContainer component={Paper} className="container-grid">
            <Table
              className="table"
              size="small"
              stickyHeader
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {characters.length !== 0 ? (
                    characters.map((value, index) => (
                      <TableCell key={index} align="center" className="titles">
                        <h2>{value.translate}</h2>
                      </TableCell>
                    ))
                  ) : (
                    <TableCell className="center-text">
                      <h2>Приёмов нет</h2>
                    </TableCell>
                  )}
                  {characters.length !== 0 && <TableCell> </TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow hover key={row._id}>
                    {characters.map((name, index) => (
                      <TableCell
                        className="text-wrap"
                        key={index}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row[name.immediately]}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <div className="buttons-row">
                        <IconButton
                          aria-label="edit"
                          onClick={(e) =>
                            setEditProps({
                              ...editProps,
                              open: true,
                              changeRow: row,
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={(e) =>
                            setDelProps({
                              ...delProps,
                              open: true,
                              id: row._id,
                            })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
