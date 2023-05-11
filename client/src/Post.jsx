import {format} from "date-fns"
import { Link } from "react-router-dom";

export default function Post({_id, title, summary, cover, content, createdAt, author}) {
  return (
    <div className="mb-10 md:flex md:flex-row md:gap-3">
      <div className="md:w-2/5 h-auto">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/"+cover}></img>
        </Link>
      </div>
      <div className="md:w-3/5 flex flex-col gap-1 text-xl">
        <Link to={`/post/${_id}`}>
          <h2 className="font-bold w-1/10">{title}</h2>
        </Link>
        <p className="info w-0.5/10 flex flex-row gap-3 text-xs font-bold text-slate-500">
          <a className="author italic">Author: {author.username},</a>
          <time>Created at:{format(new Date(createdAt), 'MMM d, yyyy  HH:mm')}</time>
        </p>
        <p className="w-8.5/10 text-sm">{summary}</p>
      </div>
    </div>
  );
}
