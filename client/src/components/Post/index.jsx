import React from "react";
import style from "./style.module.css";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className={style.post}>
      <div className={style.image}>
        <Link to={`/post/${post._id}`}>
          <img src={`http://localhost:3000/${post.cover}`} alt="" />
        </Link>
      </div>
      <div className={style.texts}>
        <Link to={`/post/${post._id}`}>
          <h2>{post.title}</h2>
        </Link>
        <p className={style.info}>
          <span className={style.author}>{post.author.username}</span>
          <time>{formatISO9075(new Date(post.createdAt))}</time>
        </p>
        <p className={style.summary}>{post.summary}</p>
      </div>
    </div>
  );
}
