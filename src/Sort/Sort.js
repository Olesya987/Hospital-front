import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./Sort.scss";

const Sort = ({
  setData,
  characters,
  reFlag,
  isChange,
  currentPage,
  rowsOnPage,
  setAllRows,
  sortItem,
  setSortItem,
  date,
}) => {
  const sortDirection = ["asc", "desc"];

  useEffect(() => {
    if (sortItem.value !== "") {
      const token = localStorage.getItem("token");
      axios
        .post(
          `http://localhost:8080/appointment/get/${currentPage}/${rowsOnPage}`,
          {
            value: sortItem.value,
            direction: sortItem.sort,
            before: date.before,
            after: date.after,
          },
          {
            headers: { authorization: token },
          }
        )
        .then((res) => {
          setData(res.data.appointments);
          setAllRows(res.data.allRows);
        });
    }
  }, [isChange]);

  const resetSort = (e) => {
    if (e.target.value.length !== 0) {
      const token = localStorage.getItem("token");
      axios
        .post(
          `http://localhost:8080/appointment/get/${currentPage}/${rowsOnPage}`,
          {
            value: e.target.value,
            direction: sortItem.sort,
            before: date.before,
            after: date.after,
          },
          {
            headers: { authorization: token },
          }
        )
        .then((res) => setData(res.data.appointments));
    } else {
      reFlag();
    }
    setSortItem({ value: e.target.value, sort: "asc" });
  };

  const resetDirection = (e) => {
    if (e.target.value.length !== 0) {
      setSortItem({ ...sortItem, sort: e.target.value });
      const token = localStorage.getItem("token");
      axios
        .post(
          `http://localhost:8080/appointment/get/${currentPage}/${rowsOnPage}`,
          {
            value: sortItem.value,
            direction: e.target.value,
            before: date.before,
            after: date.after,
          },
          {
            headers: { authorization: token },
          }
        )
        .then((res) => setData(res.data.appointments));
    } else {
      setSortItem({ value: "", sort: "asc" });
      reFlag();
    }
  };

  return (
    <Grid container className="root" spacing={1}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid key="fieldSort" item>
            <div className="auth-div-login">
              <FormControl variant="outlined" className="formControl">
                <InputLabel id="demo-simple-select-outlined-label">
                  Сортировка по:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="input-sort1"
                  name="input-sort1"
                  value={sortItem.value}
                  onChange={(e) => resetSort(e)}
                  label="Сортировка по:"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {characters.length !== 0 &&
                    characters.map((val, index) => (
                      <MenuItem key={index} value={val.immediately}>
                        {val.translate}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          {sortItem.value !== "" && (
            <Grid key="fieldSort2" item>
              <div className="auth-div-login">
                <FormControl variant="outlined" className="formControl">
                  <InputLabel id="demo-simple-select-outlined-label2">
                    Сортировка по:
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label2"
                    id="input-sort2"
                    name="input-sort2"
                    value={sortItem.sort}
                    onChange={(e) => resetDirection(e)}
                    label="Сортировка по:"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {characters.length !== 0 &&
                      sortDirection.map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Sort;
