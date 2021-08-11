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

const AppGrid = ({ setData, data }) => {
  const [characters, setCharacters] = useState([]);
  const characters2 = ["Имя", "Врач", "Дата", "Жалобы"];
  const [delProps, setDelProps] = React.useState({
    open: false,
    id: "",
  });

  useEffect(() => {
    if (data.length === 0) {
      const info = JSON.parse(localStorage.getItem("info"));
      axios
        .get("http://localhost:8080/appointment/get", {
          headers: { authorization: info.token },
        })
        .then((res) => {
          const temp = res.data.appointments;
          const arr = [];
          for (let key in temp[0]) {
            if (key !== "_id") arr.push(key);
          }
          setCharacters(arr);
          setData(res.data.appointments);
        });
    }
  });

  const handleCloseDel = () => {
    setDelProps({
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
                {characters2.map((value, index) => (
                  <TableCell key={index} align="center" className="titles">
                    <h2>{value}</h2>
                  </TableCell>
                ))}
                <TableCell> </TableCell>
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
                      {row[name]}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <div>
                      <IconButton aria-label="edit">
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
