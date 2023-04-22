import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { getPlants } from "~/models/plant.server";

export const loader = async () => {
  return json({ plants: await getPlants() });
};

export default function PlantAdmin() {
  const { plants } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Blog Admin</h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {plants.map((plant) => (
              <li key={plant.slug}>
                <Link to={plant.slug} className="text-blue-600 underline">
                  {plant.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
