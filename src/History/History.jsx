import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailHistory from "./Component/DetailHistory";
import MainHistory from "./Component/MainHistory";

function History(props) {
  console.log("#1");
  return (
    <Routes>
      <Route path="/" element={<MainHistory />} />

      <Route path="/:id" element={<DetailHistory />} />
    </Routes>
  );
}

export default History;
