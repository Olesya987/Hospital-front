import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import "./ModalDel.scss";

const ModalDel = ({ allState, reFlag, onChangeModal }) => {
  const delFunc = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://localhost:8080/appointment/del?id=${allState.modalProps.id}`,
        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        onSaveChangesModal();
      });
  };

  const onSaveChangesModal = () => {
    reFlag();
    onCloseModalDel();
  };

  const onCloseModalDel = () => {
    onChangeModal({
      open: false,
      id: "",
    });
  };

  return (
    <Dialog
      open={allState.modalProps.open}
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

export default connect(
  (state) => ({
    allState: state,
  }),
  (dispatch) => ({
    reFlag: () => {
      dispatch({ type: "SET_FLAG" });
    },
    onChangeModal: (obj) => {
      dispatch({ type: "SET_ALL_PROPS", newValue: obj });
    },
  })
)(ModalDel);
