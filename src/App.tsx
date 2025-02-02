import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Watch, Search } from "./pages/";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watch/:id" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}
