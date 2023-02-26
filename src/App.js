import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import UserList from "./pages/userPage/UserList";
import Welcome from "./pages/Welcomepage/Welcome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Booklist from "./pages/bookpage/Booklist";
import BookAddImage from "./pages/bookpage/BookAddImage";

function App() {
  const { mainOption, getBooklist } = useSelector((state) => state.global);
  console.log(mainOption, getBooklist);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({ type: "MAIN_SCREEN_OPTION", payload: 0 });
  // }, []);

  return (
    <div className="app">
      <Navbar />
      <ToastContainer />
      {/* <Container sx={{ height: "100hv" }}> */}
      <div style={{ height: "100%" }}>
        {
          {
            0: <Welcome />,
            1: <Login />,
            2: <UserList />,
            3: <Booklist />,
          }[mainOption]
        }
      </div>
      {/* </Container> */}
    </div>
  );
}

export default App;
