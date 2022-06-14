import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import profile from "./profile.jpg";
import profilepic from "./profilepic.png";
import PostModel from "./Model/PostModel";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [modelopen, setModelopen] = useState(false);

  useEffect(() => {
    async function getdata() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    getdata();
  }, []);

  console.log(posts.title);

  function Modelfn() {
    setModelopen(true);
  }

  return (
    <div className="min-h-[100vh] max-w-[1400px] h-auto mx-auto bg-[#202124] ">
      <Navbar />
      {modelopen && <PostModel closemodal={setModelopen} />}

      <div
        className="bg-[#333] flex gap-3 justify-center items-center px-10 my-10 w-full h-[100px] rounded-md"
        onClick={Modelfn}
      >
        <img src={profilepic} alt="" className="w-[50px]" />
        <input
          type="text"
          placeholder="Whats on Your Mind ?"
          className="w-full text-xl h-[55px] bg-gray-600 px-8 rounded-[100px] outline-none"
        />
      </div>

      {posts.map((post) => {
        return (
          <div className="bg-[#333] mt-5 p-10 rounded-md">
            <h1 className="text-2xl text-gray-300">{post.title}</h1>
            <p className="text-gray-400 my-6">{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Blog;
