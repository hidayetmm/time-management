import "./App.css";
import Navigation from "components/Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import Login from "containers/Login/Login";
import Registration from "containers/Registration/Registration";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        {/*<PrivateRoute component={RecordManagement} />*/}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
