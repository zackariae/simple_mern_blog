import React from "react";
import style from "./style.module.css";
export default function Post({ post }) {
  return (
    <div className={style.post}>
      <div className={style.image}>
        <img src={post.cover} alt="" />
      </div>
      <div className={style.texts}>
        <h2>{post.title}</h2>
        <p className={style.info}>
          <span className={style.author}>Zackria Sebai</span>
          <time>2024-04-23</time>
        </p>
        <p className={style.summary}>{post.summary}</p>
      </div>
    </div>
  );
}
