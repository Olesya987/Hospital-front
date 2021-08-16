import React, { useState, useEffect } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import "./Filter.scss";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";

const Filter = ({ data, setData, setFlag, setLength, length }) => {
  const [addFilter, setFilter] = useState(false);

  const [date, setDate] = useState({
    before: "0000-00-00",
    after: "9999-99-99",
  });

  useEffect(()=>{
    filterDate();

  }, [length])

  const setB = (e) => {
    setDate({ ...date, before: e.target.value || "0000-00-00" });
  };
  const setA = (e) => {
    setDate({ ...date, after: e.target.value || "9999-99-99" });
  };

  const filterDate = () => {
    const arr = [];
    data.forEach((elem) => {
      if (elem.date <= date.after && elem.date >= date.before) {
        arr.push(elem);
      }
    });
    setData(arr);
    setLength(arr.length);
  };

  const clearDate = () => {
    setDate({
      before: "0000-00-00",
      after: "9999-99-99",
    });
    setFilter(false);
    setFlag(true);
  };

  return (
    <Grid container className="root" spacing={1}>
      <Grid item xs={12}>
        {!addFilter && (
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
        )}
        {addFilter && (
          <Grid
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
                  onChange={(e) => setB(e)}
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
                  onChange={(e) => setA(e)}
                />
              </div>
            </Grid>
            <IconButton aria-label="filter" onClick={(e) => filterDate()}>
              <FilterListIcon />
            </IconButton>
            <IconButton aria-label="del-filter" onClick={(e) => clearDate()}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Filter;
