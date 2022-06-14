import React from "react";
import profile from "../profile.jpg";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import { motion, useDomEvent } from "framer-motion";

function PostModel({ closemodal }) {
  const transition = {
    type: "spring",
    damping: 25,
    stiffness: 120,
  };
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const history = useHistory();

  function submithandle() {
    setDoc(doc(db, "posts", title), {
      title: title,
      content: postContent,
    });
    closemodal(false);
  }
  return (
    <motion.div className="postmodel fixed h-[100%]  left-0 top-0 right-0 bg-[#0e0e0e7e] flex items-center justify-center">
      <motion.div
        animate={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="w-[500px]  rounded-md p-[20px] h-auto flex flex-col bg-white 
        "
      >
        <div className="flex justify-center items-center h-[60px] border-b-[1px] ">
          <h1 className="text-xl font-bold">Create post</h1>
        </div>
        <div className="flex mt-3 justify-start items-center h-auto ">
          <div className="flex px-[10px] items-center flex-row gap-4">
            <img src={profile} className="h-[34px] " alt="profile pic" />
            <div className="flex flex-col ">
              <h1 className="text-lg">Karthiksb</h1>
              <p className="  text-xs">public</p>
            </div>
          </div>
        </div>
        <input
          className="outline-none p-[10px] text-xl  mt-5 w-[100%] min-h-[40px] max-[60px]"
          placeholder="Add a title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="p-[10px] mt-4 outline-none text-xl w-[100%] min-h-[200px] max-h-[500px] "
          id="w3review"
          name="w3review"
          placeholder="Whats on your Mind?"
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          onClick={submithandle}
          className="rounded-md w-[100%] h-[40px] mt-5 text-white font-medium bg-blue-600"
        >
          Post
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default PostModel;
