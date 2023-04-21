import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev){
	  ev.preventDefault();
	  const response = await fetch("http://localhost:4000/register", {
		  method: "POST",
		  body: JSON.stringify({username, password}),
		  headers: {'Content-Type':'application/json'},
	  })
	  if(response.status === 200){
		  alert("Registration Successful")
		  
	  } else{
		  alert("Registration Failed")
	  }
  } 
  return (
    <div className="flex flex-col h-screen w-full items-center">
      <div className="text-2xl font-bold p-5 text-gray-600">Register</div>
      <form className="flex flex-col gap-1" onSubmit={register}>
        <input
          className="border border-gray-600 rounded p-0.5 bg-blue-200"
          type="text"
          placeholder="username"
	  value={username}
	  onChange={ev => setUsername(ev.target.value)}
        />
        <input
          className="border border-gray-600 rounded p-0.5 bg-blue-200"
          type="password"
          placeholder="password"
	  value={password}
	  onChange={ev => setPassword(ev.target.value)}
        />
        <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-0.5 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
}
