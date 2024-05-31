import React from "react";
import style from "./register.module.css";
export default function Register() {
  return (
    <form className={style.register}>
      <h1>Register</h1>
      <input type="text" placeholder="username" />
      <input type="email" name="" placeholder="email" id="" />
      <input type="password" name="" placeholder="password" id="" />
      <button>Register</button>
    </form>
  );
}
