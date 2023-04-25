import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";

import { getPlantWithCrops } from "~/models/plant.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);
  const plant = await getPlantWithCrops(params.slug);
  invariant(plant, `Plant not found: ${params.slug}`);

  const html = marked(plant.markdown);

  return json({ plant, html });
};

export default function PlantSlug() {
  const { plant, html } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{plant.name}</h1>
      {plant.crops.map((crop) => (
        <div key={crop.name}>{crop.name}</div>
      ))}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Link to={`/plants/admin/${plant.slug}`}>Edit</Link>
    </main>
  );
}
