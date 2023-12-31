import "./App.css";
import Homepage from "./screens/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./screens/RegisterScreen";
import Login from "./screens/Loginscreen";
import Protected from "./utils/Protected";
import GameScreen from "./screens/GameScreen/Index";
import Select from "./screens/SelectGameScreen/Select";
import SelectOnline from "./screens/SelectGameScreen/SelectOnline";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/select" element={<Select />} />

        <Route
          exact
          path="/select/online"
          element={
            <Protected>
              <SelectOnline />
            </Protected>
          }
        />

        <Route
          exact
          path="/play/:id/:turn"
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
