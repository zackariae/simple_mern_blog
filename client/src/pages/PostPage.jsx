import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./postPage.module.css";
import { formatISO9075 } from "date-fns";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";
  return (
    <div className={style.page}>
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className={style.author}>by @{postInfo.author.username}</div>
      <div className={style.image}>
        <img src={`http://localhost:3000/${postInfo.cover}`}></img>
      </div>

      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      ></div>
    </div>
  );
}
