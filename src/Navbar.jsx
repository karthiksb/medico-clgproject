import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  namedQuery,
} from "firebase/firestore";
import { db } from "./firebase";
import profile from "./profile.jpg";

function Navbar() {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const history = useHistory();
  const auth = getAuth();

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          setUser(user);
          console.log(uid);
        } else {
          console.log("log out");
        }
      });
    } catch (err) {}
  }, [user]);
  async function fetchData() {
    var ref = doc(db, "user", user.uid);
    const docnap = await getDoc(ref);

    setName(docnap.data().name);
  }

  fetchData();

  function loginClick() {
    history.push("/login");
  }

  function signout() {
    signOut(auth)
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }
  return (
    <div className="w-full h-full navbar max-w-[1400px] mx-auto  ">
      <div className="flex  justify-between items-center">
        <h1 className="text-4xl  pt-5 text-red-400 pb-5 font-semibold">
          MEDICO
        </h1>
        {user ? (
          <div className=" flex gap-4 items-center">
            <h1 className="text-xl text-white">{name}</h1>
            <button
              onClick={signout}
              className="btn w-[100px] h-[60px] bg-red-400 "
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={loginClick}
            className="btn w-[100px] h-[60px] bg-red-400 "
          >
            Login
          </button>
        )}
      </div>

      <div className=" flex  h-14 w-[100%]  top-10  items-center justify-center gap-4 mt-5 ">
        <div className="w-[200px]  flex justify-center h-full border-red-400 border-b-2">
          <Link to="/" className=" text-white text-2xl font-medium">
            NEWS
          </Link>
        </div>
        <div className="w-[200px] flex justify-center h-full border-red-400 border-b-2">
          <Link to="/blog" className="text-white text-2xl font-medium">
            BLOGS
          </Link>
        </div>{" "}
        <div className="w-[200px] flex justify-center h-full border-red-400 border-b-2">
          <Link to="/exercise" className="text-white text-2xl font-medium">
            EXERCISE
          </Link>
        </div>{" "}
        <div className="w-[200px] flex justify-center h-full border-red-400 border-b-2">
          <Link to="/diet" className="text-white text-2xl font-medium">
            RECIPE
          </Link>
        </div>{" "}
      </div>
    </div>
  );
}

export default Navbar;
