import { Outlet } from "react-router-dom";
import Header from "./Header";
export default function Layout() {
  return (
    <main className="p-10 pt-6">
      <Header />
      <Outlet />
    </main>
  );
}
