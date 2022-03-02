import { Link, redirect } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/computers/db.server.js";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const response = await fetch("http://localhost:3000/api/computers", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
          "Content-Type": "application/json",
      },
  });
  const body = await response.json();
  console.log(body);
  return redirect(`/computers/${body.id}`);
};

export default function NewProduct() {
  return (
    <>
      <Breadcrumb links={[{ to: "/computers", title: "Computers" }]} />
      <PageHeader title="New product" subtitle="Make it a good one" />
      <div>
        <form method="post" className="w-64">
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            name="title"
            id="title"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            id="description"
            className="border p-1 border-gray-200 w-full"></textarea>
          <div className="mt-3">
            <Button type="submit">Add product</Button>
          </div>
        </form>
      </div>
    </>
  );
}

function Label({ children, ...rest }) {
  return (
    <label className="block font-semibold mt-3 mb-1" {...rest}>
      {children}
    </label>
  );
}
