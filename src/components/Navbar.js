import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useDispatch, useSelector } from "react-redux";
import { apptitle } from "../variablesandfunction/VariableFont";
import { logout } from "../service/LoginService";
import { checkRole } from "../unit/Unit";
import logo from "../img/logo.png";
import logo1 from "../img/logo1.png";

const pages = ["Home", "Books", "Users"];
const pagesEmp = ["Home", "Books"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const { loginState, loginToken } = useSelector((state) => state.global);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ background: "black" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            {" "}
            <img alt="hi" height={60} src={logo} />
          </Box>

          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {apptitle}
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {checkRole(loginToken?.data) ? (
                <>
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          handleCloseNavMenu();
                          if (page === "Home") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 0,
                            });
                          }
                          if (page === "Users") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 2,
                            });
                          }
                          if (page === "Books") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 3,
                            });
                          }
                        }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </>
              ) : (
                <>
                  {" "}
                  {pagesEmp.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          handleCloseNavMenu();
                          if (page === "Home") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 0,
                            });
                          }
                          if (page === "Users") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 2,
                            });
                          }
                          if (page === "Books") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 3,
                            });
                          }
                        }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </>
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow:1, display: { xs: "flex", md: "none" }}}>
            <img alt="hi" height={40} src={logo1} />
          </Box>
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
           
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {loginState ? (
              <>
                {checkRole(loginToken?.data) ? (
                  <>
                    {pages.map((page) => (
                      <Button
                        key={page}
                        onClick={() => {
                          handleCloseNavMenu();
                          if (page === "Home") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 0,
                            });
                          }
                          if (page === "Users") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 2,
                            });
                          }
                          if (page === "Books") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 3,
                            });
                          }
                        }}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    ))}
                  </>
                ) : (
                  <>
                    {" "}
                    {pagesEmp.map((page) => (
                      <Button
                        key={page}
                        onClick={() => {
                          handleCloseNavMenu();
                          if (page === "Home") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 0,
                            });
                          }
                          if (page === "Users") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 2,
                            });
                          }
                          if (page === "Books") {
                            dispatch({
                              type: "MAIN_SCREEN_OPTION",
                              payload: 3,
                            });
                          }
                        }}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    handleCloseNavMenu();

                    dispatch({ type: "MAIN_SCREEN_OPTION", payload: 0 });
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Home
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               Login
              </IconButton>
            </Tooltip> */}
            <Button
              onClick={() => {
                if (loginState) {
                  dispatch(logout());
                  dispatch({ type: "MAIN_SCREEN_OPTION", payload: 1 });
                } else {
                  dispatch({ type: "MAIN_SCREEN_OPTION", payload: 1 });
                }
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {loginState ? "Logout" : "Login"}
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
