import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import DogList from "./doglist";
import { useState } from "react";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dogs" element={<DogList />} />
    </Routes>
</Router>
  );
}

export default App;
