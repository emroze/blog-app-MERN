import {useEffect} from "react";
import {Link} from "react-router-dom";

export default function Header() {
  useEffect(()=>{
	  fetch('http://localhost:4000/profile',{
		credentials: 'include',
	  })
  },[]);
	return (
    <header className="flex items-center justify-between gap-2 mb-5">
      <Link className="font-bold text-gray-500 hover:text-gray-900" to="/">
        MERN-Blog
      </Link>
      <nav className="flex flex-row items-center gap-3 ">
        <Link className="text-gray-500 hover:text-gray-900" to="/login">
          Login
        </Link>
        <Link className="text-gray-500 hover:text-gray-900" to="/register">
          Register
        </Link>
      </nav>
    </header>
  );
}
