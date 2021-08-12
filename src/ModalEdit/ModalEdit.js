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
} from "@material-ui/core";
import "./ModalEdit.scss";

const ModalEdit = ({ open, changeRow, setData, setFlag, setEditProps }) => {
  const [changes, setChanges] = useState({});

  useEffect(() => {
    if (!changes.name) {
      setChanges({
        _id:changeRow._id,
        name:changeRow.name,
        docName:changeRow.docName,
        date:changeRow.date,
        complaints:changeRow.complaints,
      });
    }
  }, [changeRow]);

  const handleCloseEdit = () => {
    setEditProps({
      open: false,
      changeRow: {},
      setData,
      setFlag,
    });
    setChanges({});
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
        setData(res.data.appointments);
        setFlag(true);
        setChanges({});
      });
    setEditProps({
      open: false,
      changeRow: {},
      setData,
      setFlag,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleCloseEdit()}
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
              value={changes.docName}
              onChange={(e) =>
                setChanges({ ...changes, docName: e.target.value })
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
            onClick={() => handleCloseEdit()}
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
    </Dialog>
  );
};

export default ModalEdit;
