import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./postPage.module.css";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../components/Usercontext";

export default function PostPage() {
  const { userInfo } = useContext(UserContext);
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
      {userInfo.id === postInfo.author._id ? (
        <div className={style.editRow}>
          <Link to={`/edit/${postInfo._id}`} className={style.editBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
            Edit
          </Link>
        </div>
      ) : (
        ""
      )}
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
