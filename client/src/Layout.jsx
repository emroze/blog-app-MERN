import { Outlet } from "react-router-dom";
import Header from "./Header";
export default function Layout() {
  return (
    <main className="p-10 pt-3 mt-3">
      <Header />
      <Outlet />
    </main>
  );
}
