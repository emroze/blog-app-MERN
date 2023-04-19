export default function Post() {
  return (
    <div className="post flex flex-row gap-3 mb-10">
      <div className="image w-2/5 h-auto">
        <img src="https://s42814.pcdn.co/wp-content/uploads/2020/08/iStock_1062664228-1-scaled.jpg.webp"></img>
      </div>
      <div className="text w-3/5 flex flex-col gap-1 text-xl">
        <h2 className="font-bold w-1/10">Whole-House Battery Backup</h2>
        <p className="info w-0.5/10 flex flex-row gap-3 text-xs font-bold text-gray-600">
          <a className="author">Emroze Islam</a>
          <time>2023-04-19</time>
        </p>
        <p className="w-8.5/10 text-sm">
          Green Mountain Power, the largest power utility in Vermont, is
          discounting home battery systems for its customers because it also
          reserves the ability to remotely access the homeowner’s battery,
          drawing power back into the grid on hot summer days, when overall
          demand for power is high, and storing power in the home batteries of
          its customers overnight, when demand is low.
        </p>
      </div>
    </div>
  );
}
