import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
import "./Add.scss";

const Add = ({ setData, setFlag, setLength }) => {
  const [require, setRequire] = useState({
    name: "",
    docName: "",
    date: "",
    complaints: "",
  });

  const checkFields = () => {
    return (
      require.name.length !== 0 &&
      require.docName.length !== 0 &&
      require.date.length !== 0 &&
      require.complaints.length !== 0
    );
  };

  const addAppointment = () => {
    const token = localStorage.getItem("token");
    const { name, docName, date, complaints } = require;
    axios
      .post(
        "http://localhost:8080/appointment/post",
        {
          name,
          docName,
          date,
          complaints,
        },
        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        setRequire({
          name: "",
          docName: "",
          date: "",
          complaints: "",
        });
        setData(res.data.appointments);
        // setFlag(true);
        setLength(res.data.appointments.length);
      });
  };

  return (
    <div className="sort-main">
      <Grid container className="root" spacing={1}>
        <Grid item xs={12}>
          <Grid
          id='grid-add'
            container
            alignItems="center"
            justifyContent="space-around"
            spacing={1}
          >
            <Grid key="name" item>
              <div className="auth-div-login">
                <TextField
                  id="input-name"
                  name="input-name"
                  label="Имя"
                  type="text"
                  variant="outlined"
                  value={require.name}
                  onChange={(e) =>
                    setRequire({ ...require, name: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid key="docName" item>
              <div className="auth-div-login">
                <FormControl variant="outlined" className="formControl">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Врач
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="input-docName"
                    name="input-docName"
                    value={require.docName}
                    onChange={(e) =>
                      setRequire({ ...require, docName: e.target.value })
                    }
                    label="Врач"
                  >
                    <MenuItem value="">
                      <em>Врач не выбран</em>
                    </MenuItem>
                    <MenuItem value={"Зайцева Афродита Петровна"}>
                      Зайцева Афродита Петровна
                    </MenuItem>
                    <MenuItem value={"Пульц Генадий Евгеньевич"}>
                      Пульц Генадий Евгеньевич
                    </MenuItem>
                    <MenuItem value={"Доктор Плюшева"}>Доктор Плюшева</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid key="date" item>
              <div className="auth-div-login">
                <TextField
                  id="input-date"
                  name="input-date"
                  label="Дата"
                  variant="outlined"
                  type="date"
                  className="textField"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={require.date}
                  onChange={(e) =>
                    setRequire({ ...require, date: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid key="complaints" item>
              <div className="auth-div-login">
                <TextField
                  id="input-complaints"
                  name="input-complaints"
                  label="Жалобы"
                  type="text"
                  variant="outlined"
                  value={require.complaints}
                  onChange={(e) =>
                    setRequire({ ...require, complaints: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid key="add" item>
              <div className="auth-div-login">
                <Button
                  className="button-add"
                  variant="outlined"
                  color="primary"
                  type="none"
                  disabled={!checkFields()}
                  onClick={() => addAppointment()}
                >
                  Добавить
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Add;
