import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpListing from "../src/templates/EmpListing";
import EmpCreate from "../src/templates/EmpCreate";
import EmpEdit from "../src/templates/EmpEdit";
import EmpDetail from "../src/templates/EmpDetail";

function App() {
  return (
    <div className="App">
      <h1>Create react-app+Django CRUD Operation</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmpListing />}></Route>
          <Route path="/employee/create/" element={<EmpCreate />}></Route>
          <Route path="/employee/detail/:empid" element={<EmpDetail />}></Route>
          <Route path="/employee/edit/:empid" element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
