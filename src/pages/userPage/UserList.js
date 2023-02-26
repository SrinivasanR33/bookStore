import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditOffIcon from "@mui/icons-material/EditOff";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import {
  addUserData,
  deleteUserData,
  EditUserData,
  getUser,
  UserSend,
} from "../../service/UserService";

function UserList() {
  const dispatch = useDispatch();
  const { getuserList } = useSelector((state) => state.user);
  const { loginState, loginToken } = useSelector((state) => state.global);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedRow, setselectedRow] = useState({});
  const [addUser, setAddUser] = useState({
    username: "",
    password: "",
    email: "",
    roles: "",
    active: true,
  });
  const [sendMailContent, setSendMailContent] = useState({
    title: "",
    body: "",
  });
  const handleClosedia = () => {
    setDialogOpen(false);
    setSendMailContent({ title: "", body: "" });
  };
  const handelSubmit = () => {
    console.log("hi");
    console.log(sendMailContent);
  };
  useEffect(() => {
    if (loginState) {
      dispatch(getUser());
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    setEdit(false);
    setAddUser({
      username: "",
      password: "",
      email: "",
      roles: "",
      active: true,
    });
  };
  const handleRole = (e) => {
    console.log(e);
    setAddUser({ ...addUser, roles: e.target.value });
  };
  const handleActiv = (e) => {
    console.log(e.target.checked);
    setAddUser({ ...addUser, active: e.target.checked });
  };
  const editUser = (e) => {
    setEdit(true);
    setShow(true);
    setselectedRow(e);
    console.log(e);
    setAddUser({
      username: e?.username,
      password: e?.password,
      email: e?.email,
      roles: e?.roles[0],
      active: e?.active,
    });
  };
  const sendMail = async (row) => {
    console.log(row);
    const emailData = {
      from: "vasan4649@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: row.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
      subject: "Website Contact Form",
      text: `Sender name: ${row.username}`,
      html: `
          <h4>Email received from contact form:</h4>
          <p>Sender name: ${row.username}</p>
          <p>Sender email: ${row.email}</p>
          <p>${sendMailContent.title}</p>
          <hr />
          <p>${sendMailContent.body}</p>
          <p>https://onemancode.com</p>
      `,
    };
    await dispatch(UserSend(emailData));
    handleClosedia();
    //  setDialogOpen(false)
  };
  const onSubmit = async () => {
    console.log(addUser);
    if (!edit) {
      await dispatch(addUserData(addUser));
      dispatch(getUser());
      handleClose();
      setEdit(false);
    } else {
      selectedRow.username = addUser.username;
      selectedRow.email = addUser.email;
      // selectedRow.password = addUser.password;
      selectedRow.roles = addUser.roles;
      selectedRow.active = addUser.active;
      selectedRow.id = selectedRow._id;
      delete selectedRow._id;
      await dispatch(EditUserData(selectedRow));
      dispatch(getUser());
      handleClose();
      setEdit(false);
    }
  };
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
          display: "flex",
          justifyContent: "center",
          width: 1100,
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Container>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              {show ? (
                <Box>
                  <Typography variant="h5">
                    User {edit ? "Edit" : "Add"}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h5">Users List</Typography>
                </Box>
              )}
              <Box>
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
            {!show ? (
              <Box>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell
                          sx={{
                            display: { xs: "none", md: "flex" },
                            justifyContent: "center",
                          }}
                          align="center"
                        >
                          Email
                        </TableCell>
                        <TableCell align="center">Roles</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ overFlowX: "auto" }}>
                      {getuserList.length > 0 &&
                        getuserList.map((row) => (
                          <TableRow
                            key={row._id}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell
                              sx={{
                                display: { xs: "none", md: "flex" },
                                justifyContent: "center",
                              }}
                              align="center"
                            >
                              {row.email}
                            </TableCell>
                            <TableCell align="center">{row.roles[0]}</TableCell>
                            <TableCell align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box>
                                  <EditOffIcon
                                    sx={{ cursor: "pointer" }}
                                    color="primary"
                                    onClick={() => editUser(row)}
                                  />
                                </Box>
                                <Box>
                                  <SendIcon
                                    sx={{ cursor: "pointer" }}
                                    color="success"
                                    onClick={() => {
                                      setDialogOpen(true);
                                      setselectedRow(row);
                                    }}
                                  />
                                </Box>
                                <Box>
                                  <DeleteIcon
                                    onClick={() =>
                                      dispatch(deleteUserData(row))
                                    }
                                    sx={{ cursor: "pointer" }}
                                    color="error"
                                  />
                                </Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={4} md={4}>
                    <Box sx={{ p: 1 }}>
                      <TextField
                        id="filled-basic"
                        label="User Name"
                        type={"text"}
                        variant="filled"
                        value={addUser.username}
                        onChange={(e) =>
                          setAddUser({
                            ...addUser,
                            username: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Grid>
                  {edit ? null : (
                    <Grid xs={12} sm={4} md={4}>
                      <Box sx={{ p: 1 }}>
                        <TextField
                          id="filled-basic"
                          label="Password"
                          type={"password"}
                          variant="filled"
                          value={addUser.password}
                          onChange={(e) =>
                            setAddUser({
                              ...addUser,
                              password: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Grid>
                  )}
                  <Grid xs={12} sm={4} md={4}>
                    <Box sx={{ p: 1 }}>
                      <TextField
                        id="filled-basic"
                        label="Email"
                        type={"email"}
                        variant="filled"
                        value={addUser.email}
                        onChange={(e) =>
                          setAddUser({ ...addUser, email: e.target.value })
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid xs={12} sm={4} md={4}>
                    {" "}
                    <Box sx={{ p: 1 }}>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel id="demo-simple-select-standard-label">
                          Roles
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={addUser.roles}
                          onChange={handleRole}
                          label="Role"
                        >
                          <MenuItem value={"Admin"}>Admin</MenuItem>
                          <MenuItem value={"Employee"}>Employee</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid xs={12} sm={4} md={4}>
                    <Box sx={{ p: 1 }}>
                      <Checkbox
                        checked={addUser.active}
                        onChange={handleActiv}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs={12} sm={4} md={4}>
                    <Box sx={{ p: 2 }}>
                      {" "}
                      <Button
                        variant="contained"
                        color="success"
                        onClick={onSubmit}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Send Email</DialogTitle>
        <DialogContent>
          <div>
            <Box>
              <Grid container spacing={1}>
                <Grid xs={12} md={12} sm={4}>
                  <Box sx={{ p: 1 }}>
                    <TextField
                      variant="filled"
                      type={"text"}
                      label="Title"
                      fullWidth
                      value={sendMailContent.title}
                      onChange={(e) =>
                        setSendMailContent({
                          ...sendMailContent,
                          title: e.target.value,
                        })
                      }
                    />
                  </Box>
                </Grid>
                <Grid xs={12} md={12} sm={4}>
                  <Box sx={{ p: 1 }}>
                    <TextField
                      variant="filled"
                      type={"text"}
                      multiline
                      rows={4}
                      fullWidth
                      label="Email Content"
                      value={sendMailContent.body}
                      onChange={(e) =>
                        setSendMailContent({
                          ...sendMailContent,
                          body: e.target.value,
                        })
                      }
                    />
                  </Box>
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
            onClick={handleClosedia}
          >
            close
          </Button>

          <Button
            variant="contained"
            color="success"
            size="small"
            // sx={buttonHover(colorData.laseBlack, colorData.white)}
            onClick={() => {
              setDialogOpen(false);
              sendMail(selectedRow);
            }}
          >
            send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserList;
