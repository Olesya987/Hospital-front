import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, TextField, IconButton, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import "./Filter.scss";

const Filter = ({
  allState,
  onChangeOneDate,
  onChangeAllDate,
  reFlag,
  onChangeFilter,
  onChangeStateWar,
}) => {
  const [addFilter, setFilter] = useState(false);
  const { state, date } = allState;

  const clearDate = () => {
    cleaning();
    setFilter(false);
  };

  const reFilter = () => {
    !filterCheck() && onChangeStateWar({ open: true });
  };

  const filterCheck = () => {
    const flag = date.before <= date.after;
    onChangeFilter(flag);
    flag && reFlag();
    return flag;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onChangeStateWar({ open: false });
  };

  const cleaning = () => {
    onChangeAllDate({
      before: "0000-00-00",
      after: "9999-99-99",
    });
    onChangeFilter(false);
    reFlag();
  };

  return (
    <Grid container className="root" spacing={1}>
      <Grid item xs={12}>
        {!addFilter ? (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            Добавить фильтр по дате:
            <IconButton
              aria-label="add-filter"
              onClick={(e) => setFilter(true)}
            >
              <AddBoxIcon />
            </IconButton>
          </Grid>
        ) : (
          <Grid
            id="gridFilter"
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid key="date-before" item>
              <div className="auth-div-login">
                <TextField
                  id="input-date-before"
                  name="input-date-before"
                  label="От:"
                  variant="outlined"
                  type="date"
                  className="textField"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={date.before}
                  onChange={(e) => onChangeOneDate(e.target.value, "before")}
                />
              </div>
            </Grid>
            <Grid key="date-after" item>
              <div className="auth-div-login">
                <TextField
                  id="input-date-after"
                  name="input-date-after"
                  label="До:"
                  variant="outlined"
                  type="date"
                  className="textField"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={date.after}
                  onChange={(e) => onChangeOneDate(e.target.value, "after")}
                />
              </div>
            </Grid>
            <Grid key="buttons" item>
              <IconButton aria-label="filter" onClick={(e) => reFilter()}>
                <FilterListIcon />
              </IconButton>
              <IconButton aria-label="del-filter" onClick={(e) => clearDate()}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Snackbar
        open={state.open}
        autoHideDuration={13000}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        action={
          <React.Fragment>
            <CloseIcon color="secondary" onClick={() => handleClose()} />
          </React.Fragment>
        }
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => handleClose()}
          severity="error"
        >
          Заданный временной промежуток не корректен
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default connect(
  (state) => ({
    allState: state,
  }),
  (dispatch) => ({
    onChangeAllDate: (newObj) => {
      dispatch({ type: "SET_DATE", newValue: newObj });
    },
    onChangeOneDate: (newObj, name) => {
      dispatch({ type: "SET_ONE_DATE", newValue: newObj, name });
    },
    reFlag: () => {
      dispatch({ type: "SET_FLAG" });
    },
    onChangeData: (arr) => {
      dispatch({ type: "SET_DATA", newValue: arr });
    },
    onChangeFilter: (val) => {
      dispatch({ type: "SET_FILTER", newValue: val });
    },
    onChangeStateWar: (newObj) => {
      dispatch({ type: "SET_STATE_WAR", newValue: newObj });
    },
  })
)(Filter);
