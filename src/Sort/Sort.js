import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./Sort.scss";

const Sort = ({ data, setData, characters, setFlag }) => {
  const [sortItem, setSortItem] = useState({
    value: "",
    sort: "asc",
  });
  const sortDirection = ["asc", "desc"];

  useEffect(() => {
    setSortItem({ value: "", sort: "asc" });
  }, [data.length]);

  const resetSort = (e) => {
    if (e.target.value.length !== 0) {
      data.sort((a, b) =>
        a[e.target.value] < b[e.target.value]
          ? -1
          : a[e.target.value] > b[e.target.value]
          ? 1
          : 0
      );
      setData([...data]);
    } else {
      setFlag(true);
    }
    setSortItem({ value: e.target.value, sort: "asc" });
  };

  const resetDirection = (e) => {
    if (e.target.value.length !== 0) {
      setSortItem({ ...sortItem, sort: e.target.value });
      if (e.target.value === "desc") {
        data.sort((a, b) =>
          a[sortItem.value] > b[sortItem.value]
            ? -1
            : a[sortItem.value] < b[sortItem.value]
            ? 1
            : 0
        );
      } else {
        data.sort((a, b) =>
          a[sortItem.value] < b[sortItem.value]
            ? -1
            : a[sortItem.value] > b[sortItem.value]
            ? 1
            : 0
        );
      }
      setData([...data]);
    } else {
      setSortItem({ value: "", sort: "asc" });
      setFlag(true);
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
