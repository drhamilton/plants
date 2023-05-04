import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ModelItem } from "~/components";
import { getPlants } from "~/models/plant.server";

export const loader = async () => {
  return json({ plants: await getPlants() });
};

export default function Plants() {
  const { plants } = useLoaderData<typeof loader>();

  return <ModelItem title={"Plants"} model={plants} urlKey="slug" />;
}
