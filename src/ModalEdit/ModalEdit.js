import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import "./ModalEdit.scss";

const ModalEdit = ({
  open,
  changeRow,
  onCloseModalEdit,
  onSaveChangesModal,
}) => {
  const [changes, setChanges] = useState({});
  const doctors = [
    "Зайцева Афродита Петровна",
    "Пульц Генадий Евгеньевич",
    "Доктор Плюшева",
  ];
  const [state, setState] = useState({
    open: false,
    text: "",
  });

  useEffect(() => {
    if (!changes.name) {
      setChanges(changeRow);
    }
  }, [changeRow, changes.name]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      open: false,
      text: "",
    });
  };

  const editFunc = () => {
    const { _id, name, docName, date, complaints } = changes;
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://localhost:8080/appointment/patch`,
        {
          _id,
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
        onSaveChangesModal(res.data.appointments);
      })
      .catch((err) => {
        setState({
          open: true,
          text:
            err.response.status === 420
              ? "Некоторые поля не заполнены, должны быть заполнены все поля"
              : "",
        });
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => onCloseModalEdit()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Изменить прием</DialogTitle>
      <DialogContent>
        <div className="edit-div">
          <TextField
            className="more-size"
            id="input-name"
            name="input-name"
            label="Имя"
            type="text"
            variant="outlined"
            value={changes.name}
            onChange={(e) => setChanges({ ...changes, name: e.target.value })}
          />
        </div>
        <div className="edit-div">
          <FormControl variant="outlined" className="formControl">
            <InputLabel id="demo-simple-select-outlined-label">Врач</InputLabel>
            <Select
              className="more-size"
              labelId="demo-simple-select-outlined-label"
              id="input-docName"
              name="input-docName"
              value={changes.docName || ""}
              onChange={(e) =>
                setChanges({ ...changes, docName: e.target.value })
              }
              label="Врач"
            >
              <MenuItem value="">
                <em>Врач не выбран</em>
              </MenuItem>
              {doctors.map((val, index) => (
                <MenuItem key={index} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="edit-div">
          <TextField
            id="input-date"
            name="input-date"
            label="Дата"
            variant="outlined"
            type="date"
            className="textField more-size"
            InputLabelProps={{
              shrink: true,
            }}
            value={changes.date}
            onChange={(e) => setChanges({ ...changes, date: e.target.value })}
          />
        </div>
        <div className="edit-div">
          <TextField
            className="more-size"
            multiline
            rows={4}
            id="input-complaints"
            name="input-complaints"
            label="Жалобы"
            type="text"
            variant="outlined"
            value={changes.complaints}
            onChange={(e) =>
              setChanges({ ...changes, complaints: e.target.value })
            }
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div className="edit-div-buttons">
          <Button
            onClick={() => onCloseModalEdit()}
            color="primary"
            variant="outlined"
          >
            Отмена
          </Button>
          <Button
            onClick={() => editFunc()}
            color="secondary"
            autoFocus
            variant="outlined"
          >
            Изменить
          </Button>
        </div>
      </DialogActions>
      <Snackbar
        open={state.open}
        autoHideDuration={13000}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        enqueueSnackbar="error2"
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
          {state.text}
        </MuiAlert>
      </Snackbar>
    </Dialog>
  );
};

export default ModalEdit;
