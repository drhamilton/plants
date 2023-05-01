import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <main>
      <nav>List of items</nav>
      <Outlet />
    </main>
  );
}
