import React, { useEffect, useContext } from "react";
import style from "./style.module.css"; // Import CSS module for styling
import { Link } from "react-router-dom"; // Import Link component for navigation
import { UserContext } from "../UserContext"; // Import UserContext for managing user state

export default function index() {
  const { setUserInfo, userInfo } = useContext(UserContext); // Use UserContext to get and set user information

  // Function to handle logout
  function logout() {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null); // Clear user information on logout
    });
  }

  // Effect to fetch user profile information on component mount
  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((userInfo) => {
        setUserInfo(userInfo); // Set user information in context
      });
  }, [setUserInfo]); // Dependency array to avoid re-running the effect

  const username = userInfo?.username; // Optional chaining to safely access username

  return (
    <header>
      <Link to="/" className={style.logo}>
        MyBlog
      </Link>
      <nav>
        {username ? (
          // Render links for authenticated users
          <>
            <Link to="/">{username}</Link>
            <Link to="/create">New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          // Render links for unauthenticated users
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
