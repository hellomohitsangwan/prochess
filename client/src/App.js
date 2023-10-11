import "./App.css";
import Homepage from "./screens/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./screens/RegisterScreen";
import Login from "./screens/Loginscreen";
import Protected from "./utils/Protected";
import GameScreen from "./screens/GameScreen/Index";

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

        <Route
          exact
          path="/game/:id"
          element={
            <Protected>
              <GameScreen />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
