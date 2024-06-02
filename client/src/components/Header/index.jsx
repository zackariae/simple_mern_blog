import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";
export default function index() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((userInfo) => {
        setUsername(userInfo.username);
      });
  }, []);

  return (
    <header>
      <Link to="/" className={style.logo}>
        MyBlog
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/">{username}</Link>
            <Link to="/create">New Post</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
