import { Form, useLoaderData } from "@remix-run/react";
import { json, type ActionArgs, redirect } from "@remix-run/node";
import { getPlants } from "~/models/plant.server";
import { createCrop } from "~/models/crop.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  let dateSown = new Date(String(formData.get("dateSown")));

  const crop = {
    dateSown,
    quantity: Number(formData.get("quantity")),
    location: formData.get("location"),
    name: formData.get("name"),
    plantId: Number(formData.get("plantId")),
  };

  await createCrop(crop as any);

  return redirect("/plants");
};

interface InputProps {
  label: string;
  type: string;
  name: string;
}

const Input = ({ label, type, name }: InputProps) => {
  return (
    <p>
      <label>{label}: </label>
      <input type={type} name={name} />
    </p>
  );
};

export const loader = async () => {
  return json({ plants: await getPlants() });
};

export default function NewCrop() {
  const { plants } = useLoaderData<typeof loader>();

  return (
    <Form method="post">
      <Input label="Date Sown" type="date" name="dateSown" />
      <Input label="Quantity" type="number" name="quantity" />
      <Input label="Location" type="text" name="location" />
      <Input label="Name" type="text" name="name" />
      <select name="plantId" defaultValue={plants[0].id}>
        {plants.map((plant) => {
          return (
            <option key={plant.id} value={plant.id}>
              {plant.name}
            </option>
          );
        })}
      </select>
      <p>
        <button type="submit">Create Crop</button>
      </p>
    </Form>
  );
}
