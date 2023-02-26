/* eslint-disable no-unused-expressions */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { encode } from "base64-arraybuffer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateBook,
  deleteBook,
  getBook,
  UpdateBook,
  ViewBook,
} from "../../service/BookService";
import { checkRole } from "../../unit/Unit";
import defaultbook from "../../img/defaultbook.jpg"

function Booklist() {
  const dispatch = useDispatch();

  const { loginState, loginToken, bookSearch, imageUrl } = useSelector(
    (state) => state.global
  );

  console.log(loginToken);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageDate, setImageData] = useState("");
  const [searchBook, setSearchBook] = useState("");
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedRow, setselectedRow] = useState({});
  const [bookImage, setBookImage] = useState({});
  const [addUser, setAddUser] = useState({
    bookName: "",
    authorName: "",
    photo: "",
    page: "",
    active: true,
  });
  useEffect(() => {
    if (loginState) {
      dispatch(getBook({}));
    }
  }, []);
  useEffect(() => {
    if (loginState) {
      const day = async () => {
        const arr = {};
        for (let x of bookSearch) {
          const res = await ViewBook(x._id);
          arr[x._id] = res;
        }

        setBookImage(arr);
      };
      day();
    }
  }, [bookSearch]);
  console.log(checkRole(loginToken?.data));
  const handleClose = () => {
    setDialogOpen(false);
    setShow(false);
    setEdit(false);
    setAddUser({
      bookName: "",
      authorName: "",
      photo: "",
      page: "",
      active: true,
    });
  };
  const handleDelete = async () => {
    await dispatch(deleteBook({ id: selectedRow._id }));
    setDialogOpen(false);
  };
  const handelSearch = (e) => {
    if (e) {
      setSearchBook(e);
      if (e.length > 2) {
        dispatch(getBook({ bookName: e }));
      }
    } else {
      setSearchBook("");
      dispatch(getBook({}));
    }
  };
  const handleRole = (e) => {
    console.log(e);
    setAddUser({ ...addUser, page: e.target.value });
  };
  const handleActiv = (e) => {
    console.log(e.target.checked);
    setAddUser({ ...addUser, active: e.target.checked });
  };
  const editUser = () => {
    console.log(selectedRow);
    setEdit(true);
    setShow(true);
    // setselectedRow(e);
    // console.log(e);
    setAddUser({
      bookName: selectedRow?.bookName,
      authorName: selectedRow?.authorName,
      photo: selectedRow?.photo,
      page: selectedRow?.page,
      active: selectedRow?.isActive,
    });
  };
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const handelFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setAddUser({ ...addUser, photo: base64 });
  };
  const handelSubmitte = async (e) => {
    e.preventDefault();
    if (!edit) {
      console.log(e.target);
      let form = document.getElementById("form");
      let formData = new FormData();
      formData.append("bookName", addUser.bookName);
      formData.append("authorName", addUser.authorName);
      formData.append("photo", addUser.photo);
      formData.append("page", addUser.page);
      formData.append("active", addUser.active);

      console.log(formData);
      // new line added
      await dispatch(CreateBook(formData));
      dispatch(getBook({}));
      handleClose();
    } else {
      addUser.id = selectedRow._id;
      addUser.isActive = selectedRow.isActive;
      delete addUser.active;
      await dispatch(UpdateBook(addUser));
      dispatch(getBook({}));
      handleClose();
    }
  };

  function arrayBufferToBase64(buffer) {
    console.log(buffer);
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    console.log(binary);
    return window.btoa(binary);
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        padding: "5px",
        // backgroundColor: "red",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: 1100,
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Container>
          <Paper sx={{ p: 2 }}>
            {checkRole(loginToken?.data) ? (
              <Box>
                {show ? (
                  <Box>
                    {" "}
                    <Typography variant="h5">
                      Book {edit ? "Edit" : "Add"}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h5">Book Search</Typography>
                  </Box>
                )}
                <Box sx={{ display: "flex", justifyContent: "end", p: 2 }}>
                  {show ? (
                    <Button variant="contained" onClick={handleClose}>
                      Back
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={() => setShow(true)}>
                      +Add
                    </Button>
                  )}
                </Box>
              </Box>
            ) : null}
            {!show ? (
              <Box>
                <Box sx={{p:1}}>
                  <TextField
                    label="Book Name"
                    variant="outlined"
                    name="bookName"
                    type={"text"}
                    value={searchBook}
                    onChange={(e) => handelSearch(e.target.value)}
                  />
                </Box>
                <Divider/>
                <Box sx={{ p: 2, maxHeight: 200, overflow: "auto" }}>
                  <Grid container spacing={2}>
                    {bookSearch &&
                      bookSearch.map((val, i) => (
                        <Grid xs={6} sm={4} md={2} key={i}>
                          <Box sx={{ p: 1 }}>
                            <Card
                              onClick={() => {
                                setselectedRow(val);
                                setDialogOpen(true);
                              }}
                              sx={{
                                width: 120,
                                cursor: "pointer",
                                ":hover": {
                                  boxShadow: 20,
                                },
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {" "}
                                <img
                                  alt="book"
                                  style={{
                                    height: 100,
                                    objectFit: "contain",
                                  }}
                                  src={bookImage[val._id] || defaultbook}
                                />
                                <Typography
                                  sx={{
                                    fontSize: "11px",
                                    width: 100,
                                    textOverflow: "ellipsis",
                                    textAlign: "center",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                  }}
                                >
                                  {val.bookName}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Box>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </Box>
            ) : (
              <div sx={{ p: 1 }}>
                <form
                  action="/books/upload"
                  method="post"
                  onSubmit={handelSubmitte}
                  id="form"
                  encType="multipart/form-data"
                >
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} md={4}>
                      <Box sx={{ p: 1 }}>
                        <TextField
                          label="Book Name"
                          variant="filled"
                          name="bookName"
                          type={"text"}
                          value={addUser.bookName}
                          onChange={(e) =>
                            setAddUser({ ...addUser, bookName: e.target.value })
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                      <Box sx={{ p: 1 }}>
                        <TextField
                          label="Aurthor Name"
                          variant="filled"
                          name="authorName"
                          type={"authorName"}
                          value={addUser.authorName}
                          onChange={(e) =>
                            setAddUser({
                              ...addUser,
                              authorName: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                      <Box sx={{ p: 1 }}>
                        <TextField
                          name="photo"
                          label="Photo"
                          variant="filled"
                          type="file"
                          // value={addUser.photo}
                          onChange={handelFile}
                        />
                      </Box>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                      <Box sx={{ p: 1 }}>
                        <TextField
                          name="page"
                          label="Page"
                          variant="filled"
                          type={"text"}
                          value={addUser.page}
                          onChange={(e) =>
                            setAddUser({
                              ...addUser,
                              page: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                      <Box sx={{ p: 1 }}>
                        <Checkbox
                          checked={addUser.active}
                          name="active"
                          label="Active"
                          onChange={handleActiv}
                        />{" "}
                      </Box>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                      <Box sx={{ p: 1 }}>
                        <Button type="submit" variant="contained">
                          Submit
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  {/* <button onClick={() => dispatch(ViewBook())}>View</button>
                  <img src={imageUrl} alt="hi" /> */}
                </form>
              </div>
            )}
          </Paper>
        </Container>
      </Box>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Book Info</DialogTitle>
        <DialogContent>
          <div>
            <Box>
              <Grid container spacing={1}>
                <Grid xs={12}>
                  <Box sx={{ p: 1 }}>
                    <Typography>
                      <b>Book Name:</b>
                      {selectedRow.bookName}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <Typography>
                      <b>Author Name:</b>
                      {selectedRow.authorName}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <Typography>
                      <b>Book Pages:</b>
                      {selectedRow.page}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <Typography>
                      <b>Book Status:</b>
                      {selectedRow.isActive ? "Available" : "Not available"}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <img
                      alt="ji"
                      style={{
                        height: 100,
                        objectFit: "contain",
                      }}
                      src={bookImage[selectedRow._id] || ""}
                    />
                  </Box>
                </Grid>
                <Grid xs={12} md={12} sm={4}>
                  <Box sx={{ p: 1 }}></Box>
                </Grid>
              </Grid>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="warning"
            size="small"
            // sx={buttonHover(colorData.laseBlack, colorData.white)}
            onClick={handleClose}
          >
            close
          </Button>
          {checkRole(loginToken?.data) ? (
            <>
              <Button
                variant="contained"
                color="error"
                size="small"
                // sx={buttonHover(colorData.laseBlack, colorData.white)}
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="success"
                size="small"
                // sx={buttonHover(colorData.laseBlack, colorData.white)}
                onClick={() => {
                  setDialogOpen(false);
                  editUser();
                }}
              >
                Edit
              </Button>
            </>
          ) : null}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Booklist;
