import "./App.css";
import "antd/dist/antd.css";
import Navigation from "components/Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "PrivateRoute";
import Login from "containers/Login/Login";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        {/*<PrivateRoute component={RecordManagement} />*/}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
