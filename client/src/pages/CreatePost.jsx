import React, { useState } from "react";
import style from "./createPost.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  return (
    <form>
      <h2>Create new post</h2>
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="summary" placeholder="Summary" />
      <input type="file" name="file" />
      <ReactQuill />
    </form>
  );
}
