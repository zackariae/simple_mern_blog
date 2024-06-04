import React, { useContext, useState } from "react";
import style from "./login.module.css";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/Usercontext";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  async function login(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (res.status === 200) {
        res.json().then((res) => {
          setUserInfo(res);
          setRedirect(true);
        });
      } else {
        alert("username or password is not correct");
      }
    } catch (error) {}
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className={style.login} onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name=""
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
