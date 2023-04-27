import {format} from "date-fns"

export default function Post({ title, summary, cover, content, createdAt, author}) {
  return (
    <div className="post flex flex-row gap-3 mb-10">
      <div className="image w-2/5 h-auto">
        <img src={"http://localhost:4000/"+cover}></img>
      </div>
      <div className="text w-3/5 flex flex-col gap-1 text-xl">
        <h2 className="font-bold w-1/10">{title}</h2>
        <p className="info w-0.5/10 flex flex-row gap-3 text-xs font-bold text-gray-600">
          <a className="author italic">Author: {author.username},</a>
          <time>Created at:{format(new Date(createdAt), 'MMM d, yyyy  HH:mm')}</time>
        </p>
        <p className="w-8.5/10 text-sm">{summary}</p>
      </div>
    </div>
  );
}
