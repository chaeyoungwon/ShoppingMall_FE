import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Members from "./pages/Members";
import Orders from "./pages/Orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/members" element={<Members />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
