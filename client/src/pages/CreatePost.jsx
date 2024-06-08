import React, { useState } from "react";
import style from "./createPost.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

// Component for creating a new post
export default function CreatePost() {
  // State variables for form fields and error handling
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null); // State for storing error messages

  const navigate = useNavigate();

  // Function to handle form submission
  const createPost = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Reset error state before a new submission

    // Create a FormData object to handle file uploads
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    if (files && files.length > 0) {
      data.append("file", files[0]);
    }

    try {
      // Send a POST request to the server
      const res = await fetch("http://localhost:3000/post/create", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (res.ok) {
        // Navigate to home page on successful post creation
        navigate("/");
      } else {
        // Handle server errors
        const errorMsg = await res.text(); // Get the error message from the response
        setError(`Failed to create post: ${errorMsg}`);
      }
    } catch (error) {
      // Handle network errors
      setError(`Network error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={createPost}>
      <h2>Create new post</h2>
      {/* Display error message if there is an error */}
      {error && <div className={style.error}>{error}</div>}

      {/* Input field for the post title */}
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        name="title"
        placeholder="Title"
      />

      {/* Input field for the post summary */}
      <input
        onChange={(e) => setSummary(e.target.value)}
        value={summary}
        type="text"
        name="summary"
        placeholder="Summary"
      />

      {/* Input field for file upload */}
      <input
        type="file"
        name="file"
        onChange={(e) => setFiles(e.target.files)}
      />

      {/* ReactQuill component for post content */}
      <ReactQuill
        onChange={(newValue) => setContent(newValue)}
        value={content}
        modules={modules}
        formats={formats}
      />

      {/* Submit button */}
      <button style={{ marginTop: "16px" }}>Create</button>
    </form>
  );
}

// Configuration for the ReactQuill editor
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
