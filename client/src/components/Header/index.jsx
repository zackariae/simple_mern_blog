import React from "react";
import style from "./style.module.css";
export default function index() {
  return (
    <header>
      <a href="" className={style.logo}>
        MyBlog
      </a>
      <nav>
        <a href="">Login</a>
        <a href="">Register</a>
      </nav>
    </header>
  );
}
