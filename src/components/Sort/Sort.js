import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./Sort.scss";

const Sort = ({ allState, onChangeSort, reFlag }) => {
  const sortDirection = ["asc", "desc"];
  const { characters, sortItem } = allState;

  const resetSort = (e, name) => {
    onChangeSort(e.target.value, name);
    reFlag();
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
                  onChange={(e) => resetSort(e, "value")}
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
                    value={sortItem.direction}
                    onChange={(e) => resetSort(e, "direction")}
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

export default connect(
  (state) => ({
    allState: state,
  }),
  (dispatch) => ({
    reFlag: () => {
      dispatch({ type: "SET_FLAG" });
    },
    onChangeSort: (val, name) => {
      dispatch({ type: "SET_SORT", newValue: val, name });
    },
  })
)(Sort);
