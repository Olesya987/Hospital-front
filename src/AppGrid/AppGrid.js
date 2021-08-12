import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./AppGrid.scss";

const AppGrid = ({ setData, data, setFlag, flag }) => {
  const [characters, setCharacters] = useState([]);
  const [delProps, setDelProps] = React.useState({
    open: false,
    id: "",
  });
  const [editProps, setEditProps] = React.useState({
    open: false,
    id: "",
  });

  useEffect(() => {
    if (flag) {
      const info = JSON.parse(localStorage.getItem("info"));
      axios
        .get("http://localhost:8080/appointment/get", {
          headers: { authorization: info.token },
        })
        .then((res) => {
          const temp = res.data.appointments;
          const arr = [];
          if (temp.length !== 0) {
            for (let key in temp[0]) {
              if (key !== "_id") arr.push({ value: key, translate: "" });
            }
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].value === "name") {
                arr[i].translate = "Имя";
                continue;
              } else if (arr[i].value === "docName") {
                arr[i].translate = "Врач";
                continue;
              } else if (arr[i].value === "date") {
                arr[i].translate = "Дата";
                continue;
              } else if (arr[i].value === "complaints") {
                arr[i].translate = "Жалобы";
                continue;
              } else arr[i].translate = arr[i].value;
            }
          }
          setCharacters(arr);
          setData(res.data.appointments);
          setFlag(false);
        });
    }
  });

  const handleCloseDel = () => {
    setDelProps({
      open: false,
      id: "",
    });
  };

  const handleCloseEdit = () => {
    setEditProps({
      open: false,
      id: "",
    });
  };

  const editFunc = () => {
    const info = JSON.parse(localStorage.getItem("info"));
    setEditProps({
      open: false,
      id: "",
    });
  };

  const delFunc = () => {
    const info = JSON.parse(localStorage.getItem("info"));
    axios
      .delete(`http://localhost:8080/appointment/del?id=${delProps.id}`, {
        headers: { authorization: info.token },
      })
      .then((res) => {
        setData(res.data.appointments);
        setFlag(true);
      });
    setDelProps({
      open: false,
      id: "",
    });
  };

  return (
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
                  <tr className='center-text'><h2>Приёмов нет</h2></tr>
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
                      {row[name.value]}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <div>
                      <IconButton
                        aria-label="edit"
                        onClick={() =>
                          setEditProps({ open: !editProps.open, id: row._id })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          setDelProps({ open: !delProps.open, id: row._id })
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
      </div>
      <Dialog
        open={delProps.open}
        onClose={handleCloseDel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Удалить прием"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы действительно хотите удалить прием?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDel} color="primary" variant="outlined">
            Отмена
          </Button>
          <Button
            onClick={delFunc}
            color="secondary"
            autoFocus
            variant="outlined"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppGrid;
