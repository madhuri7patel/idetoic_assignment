import "./App.css";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Details } from "./pages/Details";
import RequiredAuth from "./hoc/RequiredAuth";

function App() {
  return (
    <Box as={"main"}>
      <Navbar />
      <Box mt={"60px"}>
        <Routes>
          <Route
            path="/"
            index
            element={
              <RequiredAuth>
                <Home />
              </RequiredAuth>
            }
          />
          <Route
            path="/details"
            element={
              <RequiredAuth>
                <Details />
              </RequiredAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
