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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ModalDel from "../ModalDel/ModalDel";
import ModalEdit from "../ModalEdit/ModalEdit";
import "./AppGrid.scss";

const AppGrid = ({ setData, data, setFlag, flag }) => {
  const [characters, setCharacters] = useState([]);
  const [editProps, setEditProps] = React.useState({
    open: false,
    id: "",
  });

  useEffect(() => {
    if (flag) {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:8080/appointment/get", {
          headers: { authorization: token },
        })
        .then((res) => {
          const temp = res.data.appointments;
          const arr = [];
          if (temp.length !== 0) {
            for (let key in temp[0]) {
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
          setData(res.data.appointments);
          setFlag(false);
        });
    }
  });

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
                        onClick={() => (
                          <ModalDel
                            open={true}
                            id={row._id}
                            setData={setData}
                            setFlag={setFlag}
                          />
                        )}
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
    </div>
  );
};

export default AppGrid;