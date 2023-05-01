import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPlants } from "~/models/plant.server";

export const loader = async () => {
  return json({ plants: await getPlants() });
};

export default function Plants() {
  const { plants } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1 className="mb-4 text-4xl font-bold">Plants</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul>
        {plants.map((plant) => (
          <li key={plant.slug}>
            <Link to={plant.slug} className="text-blue-600 underline">
              {plant.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
