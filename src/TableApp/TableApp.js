import React from "react";
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
import "./TableApp.scss";

const TableApp = ({ data, characters, changeDelProps, changeEditProps }) => {
  return (
    <TableContainer component={Paper} className="container-grid">
      <Table
        className="table"
        size="small"
        stickyHeader
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            {characters ? (
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
            {characters && <TableCell />}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
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
                      onClick={(e) => changeEditProps(true, row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => changeDelProps(true, row._id)}
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
  );
};

export default TableApp;
