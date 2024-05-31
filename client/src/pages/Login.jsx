import React from "react";
import style from "./login.module.css";
export default function Login() {
  return (
    <form className={style.login}>
      <h1>Login</h1>
      <input type="text" placeholder="username" />
      <input type="password" name="" placeholder="password" id="" />
      <button>Login</button>
    </form>
  );
}
