import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import avatar from "../../source/images/placeholder.png";
import "./Person.scss";

const Person = ({ onChangeAuthReg }) => {
  const login = localStorage.getItem("login");
  const token = localStorage.getItem("token");
  const userAvatar = localStorage.getItem("img");
  const [img, setImage] = useState(userAvatar || avatar);
  const [open, setOpen] = React.useState(false);
  const [{ alt, src, file }, setImg] = useState({
    src: "",
    alt: "your image",
    file: null,
  });

  useEffect(() => {
    onChangeAuthReg({ text: "Личный кабинет", login });
  }, []);

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
        file: e.target.files[0],
      });
      setOpen(true);
    }
  };

  const loadImg = () => {
    const formData = new FormData();
    formData.append("img", file);
    axios
      .patch("http://localhost:8080/user/patch", formData, {
        headers: { authorization: token },
      })
      .then((res) => {
        setImage(res.data);
        localStorage.setItem("img", res.data);
        handleClose();
      });
  };

  const handleClose = () => {
    setImg({
      src: "",
      alt: "your image",
      file: null,
    });
    setOpen(false);
  };

  return (
    <div className="person-main">
      <img className="avatar" src={img} alt="empty" />
      <h2>{login}</h2>
      <input
        accept="image/*"
        className="input"
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => handleImg(e)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Загрузить фотографию
        </Button>
      </label>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Загрузить изображение?
        </DialogTitle>
        <DialogContent>
          <img src={src} alt={alt}></img>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Отмена
          </Button>
          <Button onClick={() => loadImg()} color="primary" autoFocus>
            Загрузить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(
  (state) => ({
    allState: state,
  }),
  (dispatch) => ({
    onChangeAuthReg: (newObj) => {
      dispatch({ type: "SET_AUTH_REG", newValue: newObj });
    },
  })
)(Person);
