import "./index.css";

function App() {
  return (
    <main className="p-10 m-auto max-w-screen-xl">
      <header className="flex items-center justify-between gap-2 mb-3">
        <a className="font-bold" href="">
          My Blog
        </a>
        <nav className="flex flex-row items-center gap-3 ">
          <a className="hover:text-blue-600" href="">Login</a>
          <a className="hover:text-blue-600" href="">Register</a>
        </nav>
      </header>
      <div className="post flex gap-3">
        <div className="image">
          <img
            src="https://s42814.pcdn.co/wp-content/uploads/2020/08/iStock_1062664228-1-scaled.jpg.webp"
          ></img>
        </div>
        <div className="text flex flex-col gap-4">
          <h2 className="font-bold ">Whole-House Battery Backup</h2>
          <p>
            Green Mountain Power, the largest power utility in Vermont, is
            discounting home battery systems for its customers because it also
            reserves the ability to remotely access the homeowner’s battery,
            drawing power back into the grid on hot summer days, when overall
            demand for power is high, and storing power in the home batteries of
            its customers overnight, when demand is low.
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
