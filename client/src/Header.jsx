import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });

    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="flex items-center justify-between gap-2 mb-5">
      <Link className="font-bold text-gray-500 hover:text-gray-900" to="/">
        MERN-Blog
      </Link>
      <nav className="flex flex-row items-center gap-3 ">
        {username && (
          <>
            <Link className="text-gray-900 hover:text-blue-600" to="/create">Create New Post</Link>
            <button className="text-gray-900 hover:text-blue-600" onClick={logout}>Logout</button>
          </>
        )}
        {!username && (
          <>
            <Link className="text-gray-500 hover:text-gray-900" to="/login">
              Login
            </Link>
            <Link className="text-gray-500 hover:text-gray-900" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
