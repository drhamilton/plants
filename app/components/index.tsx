import { Link, Outlet } from "@remix-run/react";
import type { Model } from "~/types";

interface WrapperProps {
  title: string;
  model: Model[];
  urlKey: "id" | "slug";
}

export const ModelItem = ({ title, model, urlKey }: WrapperProps) => {
  return (
    <main className="flex h-full">
      <div className="w-full">
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        {model.map((item) => (
          <div key={item[urlKey]}>
            <Link to={`${item[urlKey]}`}>{item.name}</Link>
          </div>
        ))}
        <Link
          to={`/${title.toLocaleLowerCase()}/new`}
          className="text-blue-600 underline"
        >
          Create a new {title}
        </Link>
      </div>
      <section className="w-full">
        <Outlet />
      </section>
    </main>
  );
};
