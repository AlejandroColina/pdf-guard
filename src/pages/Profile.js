import {
  Box,
  Grid,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { getFaculties, getUser, newFiledb, deleteFile } from "../redux/action";

const Profile = () => {
  let userEmail = sessionStorage.getItem("email");
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState("");

  console.log("CHECK STATE", checked);

  const [selected, setSelected] = useState(false);
  console.log("SELECT STATE", selected);

  const handleSelected = (e) => {
    setSelected(e.target.value);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const [input, setInput] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getUser(userEmail));
    dispatch(getFaculties());
  }, [dispatch, userEmail]);

  const { faculties, currentUser } = useSelector((state) => state);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => {
      let newState = {
        ...prevState,
        [name]: value,
      };
      return newState;
    });
  };

  const defaultValues = () => {
    setInput({
      name: "",
      description: "",
    });
    setChecked(false);
    setFile(null);
    setSelected("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("myFile", file);
    form.append("FacultyId", selected);
    form.append("id_user", currentUser?.User.id);
    form.append("name", input.name);
    form.append("description", input.description);

    dispatch(newFiledb(form));

    setTimeout(() => {
      defaultValues();
      handleClose();
    }, 1000);

    setTimeout(() => {
      dispatch(getUser(userEmail));
    }, 3000);
  };

  const validateData = () => {
    if (
      !input.name.length ||
      !input.description.length ||
      !selected ||
      !currentUser?.User.id
    ) {
      return true;
    }
  };

  const deleteF = (x) => {
    dispatch(deleteFile(x));
    setTimeout(() => {
      dispatch(getUser(userEmail));
    }, 500);
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log("=====>", currentUser.User);
  return (
    <Box sx={{ overflowY: "scroll", minHeight: "100vh" }}>
      <Grid container>
        <Navbar />
        <Grid item xs={2}></Grid>
        <Grid
          item
          xs={8}
          sx={{
            padding: "2rem",
            height: "100vh",
            boxShadow: "0px -2px 2px 2px grey",
          }}
        >
          <div>
            <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
              PERFIL DE USUARIO
            </h1>
          </div>

          <Box
            sx={{
              width: "100%",
              height: "15vh",
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h2 style={{ margin: "10px 0" }}>Información personal</h2>
              <span>
                <b>Nombre completo:</b>
                <p>{`${currentUser?.User?.name} ${currentUser?.User?.firstLastName}`}</p>
              </span>
            </Box>
            <Box>
              <Button
                onClick={handleClickOpen}
                sx={{
                  color: "white",
                  background: "#00773c",
                  margin: "1.5rem 0",
                }}
              >
                Subir documento de grado
              </Button>
            </Box>
          </Box>

          <hr />

          <Box sx={{ width: "100%" }}>
            <h2 style={{ margin: "10px 0" }}>Mis documentos</h2>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {currentUser?.User?.Files.length ? (
                currentUser?.User?.Files.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "13rem",
                      minHeight: "8rem",
                      margin: "1.5rem",
                      borderRadius: "4px",
                      boxShadow: "0px 0px 5px 3px grey",
                      padding: "13px",
                    }}
                  >
                    <label>
                      <b>Nombre del proyecto</b>
                      <p>{file.name}</p>
                    </label>
                    <label>
                      <b>Descripción del proyecto</b>
                      <p>{file.description}</p>
                    </label>
                    <button onClick={() => deleteF(file.id)}>delete</button>
                  </Box>
                ))
              ) : (
                <p>No cuentas con documentos guardados </p>
              )}
            </Box>
          </Box>

          <hr />

          <Box>
            <h2 style={{ margin: "10px 0" }}>Mis favoritos</h2>
            {false ? "Tienes estos favoritos" : <p>No tienes favoritos</p>}
          </Box>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Subir documento"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Box>
                  <h2>Registrar un nuevo documento</h2>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      sx={{ margin: "15px 0" }}
                      fullWidth
                      variant="outlined"
                      id="r"
                      label="Nombre"
                      autoComplete="off"
                      placeholder="Nombre del proyecto..."
                      value={input.name}
                      onChange={handleInput}
                      name="name"
                    />
                    <TextField
                      sx={{ margin: "15px 0" }}
                      fullWidth
                      id="rrr"
                      variant="outlined"
                      label="Descripción"
                      value={input.description}
                      placeholder="Descripción del proyecto..."
                      onChange={handleInput}
                      name="description"
                    />
                    <input
                      sx={{ margin: "15px 0" }}
                      type="file"
                      onChange={handleFile}
                      name="myFile"
                    />
                    <FormControl fullWidth sx={{ margin: "15px 0" }}>
                      <InputLabel id="elect-label">Elegir facultad </InputLabel>
                      <Select
                        // variant="outlined"
                        id="select-label"
                        label={"Facultad"}
                        value={selected}
                        onChange={handleSelected}
                      >
                        {faculties &&
                          faculties.map((faculty, index) => (
                            <MenuItem key={index} value={faculty.id}>
                              {faculty.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <Button
                      fullWidth
                      sx={{ background: "#00773c", color: "white" }}
                      type="submit"
                      disabled={validateData()}
                    >
                      Enviar
                    </Button>
                  </form>
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
