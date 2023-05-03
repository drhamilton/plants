import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getCrops } from "~/models/crop.server";

export const loader = async () => {
  return json({ crops: await getCrops() });
};

export default function Crops() {
  const { crops } = useLoaderData<typeof loader>();
  return (
    <main className="flex h-full">
      <div className="w-full">
        <h1 className="mb-4 text-4xl font-bold">Crops</h1>
        {crops.map((crop) => (
          <div key={crop.id}>
            <Link to={`${crop.id}`}>{crop.name}</Link>
          </div>
        ))}
      </div>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
