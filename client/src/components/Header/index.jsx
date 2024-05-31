import React from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";
export default function index() {
  return (
    <header>
      <Link to="/" className={style.logo}>
        MyBlog
      </Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
