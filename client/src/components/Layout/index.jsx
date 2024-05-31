import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
export default function index() {
  return (
    <main>
      {" "}
      <Header />
      <Outlet />
    </main>
  );
}
