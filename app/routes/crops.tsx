import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ModelItem } from "~/components";
import { getCrops } from "~/models/crop.server";

export const loader = async () => {
  return json({ crops: await getCrops() });
};

export default function Crops() {
  const { crops } = useLoaderData<typeof loader>();

  return <ModelItem title={"Crops"} model={crops} urlKey="id" />;
}
