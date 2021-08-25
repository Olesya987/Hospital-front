import React from "react";
import { connect } from "react-redux";
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

const TableApp = ({ allState, onChangeModal }) => {
  const { data, characters } = allState;

  const tableCellValues = (name, index) => {
    return (
      <TableCell
        className="text-wrap"
        key={index}
        align="center"
        component="th"
        scope="row"
      >
        {name}
      </TableCell>
    );
  };

  const changeEditProps = (flag, changeRow) => {
    onChangeModal({
      open: flag,
      changeRow,
    });
  };

  const changeDelProps = (flag, id) => {
    onChangeModal({
      open: flag,
      id,
    });
  };

  const tableCellButtons = (row, index) => {
    return (
      <TableCell align="center" key={index}>
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
    );
  };

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
            {characters.length ? (
              characters.map((value, index) => (
                <TableCell
                  key={index}
                  align="center"
                  className={value.translate ? "titles" : ""}
                >
                  {value.translate && <h2>{value.translate}</h2>}
                </TableCell>
              ))
            ) : (
              <TableCell className="center-text">
                <h2>Приёмов нет</h2>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow hover key={row._id}>
              {characters.map((name, index) =>
                name.immediately
                  ? tableCellValues(row[name.immediately], index)
                  : tableCellButtons(row, index)
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
    onChangeModal: (obj) => {
      dispatch({ type: "SET_ALL_PROPS", newValue: obj });
    },
  })
)(TableApp);
