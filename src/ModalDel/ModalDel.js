import React from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import "./ModalDel.scss";

const ModalDel = ({ open, id, onCloseModalDel, onSaveChangesModal, setLength }) => {
  const delFunc = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/appointment/del?id=${id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        onSaveChangesModal(res.data.appointments);
        setLength(res.data.appointments.length);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => onCloseModalDel()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Удалить прием</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Вы действительно хотите удалить прием?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onCloseModalDel()}
          color="primary"
          variant="outlined"
        >
          Отмена
        </Button>
        <Button
          onClick={() => delFunc()}
          color="secondary"
          autoFocus
          variant="outlined"
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDel;
