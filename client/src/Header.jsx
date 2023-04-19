import {Link} from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-2 mb-5">
      <Link className="font-bold" to="/">
        MernBlog
      </Link>
      <nav className="flex flex-row items-center gap-3 ">
        <Link className="hover:text-blue-600" to="/login">
          Login
        </Link>
        <Link className="hover:text-blue-600" to="/register">
          Register
        </Link>
      </nav>
    </header>
  );
}
