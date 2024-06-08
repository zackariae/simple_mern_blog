import React from "react";
import style from "./style.module.css";
import { formatISO9075 } from "date-fns";

export default function Post({ post }) {
  return (
    <div className={style.post}>
      <div className={style.image}>
        <img src={`http://localhost:3000/${post.cover}`} alt="" />
      </div>
      <div className={style.texts}>
        <h2>{post.title}</h2>
        <p className={style.info}>
          <span className={style.author}>{post.author.username}</span>
          <time>{formatISO9075(new Date(post.createdAt))}</time>
        </p>
        <p className={style.summary}>{post.summary}</p>
      </div>
    </div>
  );
}
