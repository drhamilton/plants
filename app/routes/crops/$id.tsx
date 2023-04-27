import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getCrop } from "~/models/crop.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.id, `params.slug is required`);
  const crop = await getCrop(Number(params.id));
  invariant(crop, `Crop not found: ${params.id}`);

  return json({ crop });
};

export default function CropSlug() {
  const { crop } = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify(crop, null, 2)}</pre>;
}
