import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App"; 
import Reservation from './pages/Reservation';
import Dropdown from './pages/Dropdown';
import Form from './pages/Form';
import Login from './pages/Login';
// import ProtectedRoutes from './pages/ProtectedRoutes';
import Home from './pages/Home';
import ChangePass from './pages/ChangePass';
import NewHall from './pages/NewHall';
import EditHall from './pages/EditHall';
import DeleteHall from './pages/DeleteHall';
import CancelReservation from './pages/CancelReservation';
// import Check from './pages/check';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Dropdown" element={<Dropdown />} />
      <Route path="/Reservation" element={<Reservation />} />
      <Route path="/Form" element={<Form />} />

      <Route path="/Login" element={<Login />} />
      {/* <Route element = {<ProtectedRoutes/>} > */}
          <Route path="/Home" element={<Home />} />
          <Route path="/ChangePass" element={<ChangePass />} />
          <Route path="/NewHall" element={<NewHall />} />
          <Route path="/EditHall" element={<EditHall />} />
          <Route path="/DeleteHall" element={<DeleteHall />} />
          <Route path="/CancelReservation" element={<CancelReservation />} />
      {/* </Route> */}

    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
