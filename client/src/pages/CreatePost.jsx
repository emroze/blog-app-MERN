import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

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

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    }
    else{
      alert("Login First")
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="flex flex-col gap-3 " onSubmit={createNewPost}>
      <input
        className="border border-gray-300 rounded-lg p-1"
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        className="border border-gray-300 rounded-lg p-1"
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        className="border border-gray-300 rounded-lg p-1"
        type="file"
        onChange={(ev) => setFiles(ev.target.files)}
      />
      <ReactQuill
        value={content}
        onChange={(newValue) => setContent(newValue)}
        theme="snow"
        modules={modules}
        formats={formats}
      />
      <button
        type="submit"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-0.5 rounded"
      >
        Create Post
      </button>
    </form>
  );
}
