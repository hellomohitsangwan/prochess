import "./App.css";
import Homepage from "./screens/Homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./screens/RegisterScreen/Register";
import Login from "./screens/Loginscreen/Login";
import Protected from "./utils/Protected";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route
          exact
          path="/login"
          element={
            <Protected>
              <Login />
            </Protected>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <Protected>
              <Register />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
