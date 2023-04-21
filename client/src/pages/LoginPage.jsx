import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(ev) {
	  ev.preventDefault();
	  await fetch('http://localhost:4000/login',{
		  method: 'POST',
		  body: JSON.stringify({username,password}),
		  headers: {'Content-Type':'application/json'},
	  })
  }
  return (
    <div className="flex flex-col h-screen items-center ">
      <div className="text-2xl font-bold p-5">Login</div>
      <form className="flex flex-col gap-1" onSubmit={login}>
        <input
          className="border border-gray-600 rounded p-0.5 bg-blue-200"
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          className="border border-gray-600 rounded p-0.5 bg-blue-200"
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-0.5 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
