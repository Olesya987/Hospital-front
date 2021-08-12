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

const ModalDel = ({ open, id, setData, setFlag, setDelProps }) => {
  const handleCloseDel = () => {
    setDelProps({
      open: false,
      id: "",
      setData,
      setFlag,
    });
  };

  const delFunc = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/appointment/del?id=${id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        setData(res.data.appointments);
        setFlag(true);
      });
    setDelProps({
      open: false,
      id: "",
      setData,
      setFlag,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleCloseDel()}
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
          onClick={() => handleCloseDel()}
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
