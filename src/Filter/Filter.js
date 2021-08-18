import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField, IconButton } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Filter.scss";

const Filter = ({
  setData,
  reFlag,
  isChange,
  currentPage,
  setCurrentPage,
  rowsOnPage,
  setAllRows,
  date,
  setDate,
  sortItem,
}) => {
  const [addFilter, setFilter] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    isFilter && filterDate();
  }, [isChange]);

  const filterDate = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:8080/appointment/get/${currentPage}/${rowsOnPage}`,
        {
          before: date.before,
          after: date.after,
          value: sortItem.value,
          direction: sortItem.sort,
        },
        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        setData(res.data.appointments);
        setAllRows(res.data.allRows);
        if (currentPage > Math.ceil(res.data.allRows / rowsOnPage)) {
          setCurrentPage(1);
          reFlag();
        }
      });
  };

  const clearDate = () => {
    setDate({
      before: "0000-00-00",
      after: "9999-99-99",
    });
    setIsFilter(false);
    setFilter(false);
    reFlag();
  };

  const reFilter = () => {
    setIsFilter(true);
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
                  onChange={(e) =>
                    setDate({ ...date, before: e.target.value || "0000-00-00" })
                  }
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
                  onChange={(e) =>
                    setDate({ ...date, after: e.target.value || "9999-99-99" })
                  }
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
    </Grid>
  );
};

export default Filter;
