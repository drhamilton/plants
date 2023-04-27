import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPlant } from "~/models/plant.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");
  const daysToMaturity = formData.get("daysToMaturity");
  const brand = formData.get("brand");

  const errors = {
    name: name ? null : "Name is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json(errors);
  }

  invariant(typeof name === "string", "name must be string");
  invariant(typeof slug === "string", "slug must be string");
  invariant(typeof markdown === "string", "markdown must be string");
  invariant(typeof brand === "string", "brand must be string");
  invariant(
    typeof daysToMaturity === "number",
    "days to maturity must be number"
  );

  await createPlant({ name, slug, markdown, brand, daysToMaturity });

  return redirect("/plants/admin");
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPlant() {
  const errors = useActionData<typeof action>();

  return (
    <Form method="post">
      <p>
        <label>
          Plant Name:{" "}
          {errors?.name ? (
            <em className="text-red-600">{errors.name}</em>
          ) : null}
          <input type="text" name="name" className={inputClassName} />
        </label>
      </p>
      <p>
        <label>
          Plant Slug:{" "}
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
          <input type="text" name="slug" className={inputClassName} />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        {errors?.markdown ? (
          <em className="text-red-600">{errors.markdown}</em>
        ) : null}
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Plant
        </button>
      </p>
    </Form>
  );
}
