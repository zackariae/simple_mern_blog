import React from "react";
import style from "./style.module.css";
export default function Post() {
  return (
    <div className={style.post}>
      <div className={style.image}>
        <img src="https://www.picsum.photos/500/500" alt="" />
      </div>
      <div className={style.texts}>
        <h2>Full-house battery backup coming later this year</h2>
        <p className={style.info}>
          <span className={style.author}>Zackria Sebai</span>
          <time>2024-04-23</time>
        </p>
        <p className={style.summary}>
          tody at this special event we will talk about the new features of our
          innovative ideas that is not new ,tody at this special event we will
          talk about the new features of our innovative ideas that is not new
        </p>
      </div>
    </div>
  );
}
