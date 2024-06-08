import React, { useEffect, useState } from "react";
import Post from "../components/Post";

export default function Home() {
  const [posts, setPosts] = useState({});

  async function fetchPosts() {
    const res = await fetch("http://localhost:3000/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
      console.log(data[0].title);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post post={post} />;
        })}
    </div>
  );
}
