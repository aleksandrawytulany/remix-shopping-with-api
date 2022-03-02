import { useLoaderData, redirect } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";

export const loader = async function ({ params }) {
    const product = await fetch(
      `http://localhost:3000/api/computers/${params.productId}`
    );
  
    if (!product) {
      throw new Error("Product not found");
    }
  
    return product;
  };

export const action = async function({ request, params }) {
    const form = await request.formData();
    const title = form.get("title");
    const description = form.get("description");

    if (form.get("_method") === "update") {
        await fetch(
            `http://localhost:3000/api/computers/${params.productId}`, {
                method: "PUT",
                body: JSON.stringify({ title, description }),
                headers: {
                    "Content-Type": "application/json",
                    },
            }
          );
        // const body = await response.json();
        return redirect(`/computers`);
    }
  };

export default function updateProduct() {
    const product = useLoaderData();

  return (
    <>
      <Breadcrumb links={[{ to: `/computers`, title: "Computers" }]} />
      <PageHeader title="Update product" subtitle="Make it a good one" />
      <div>
        <form method="put" className="w-64">
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            name="title"
            id="title"
            className="border p-1 border-gray-200 w-full"
            placeholder={product.title}
          />
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            id="description"
            className="border p-1 border-gray-200 w-full"
            placeholder={product.description}
            ></textarea>
          <div className="mt-3">
            <Button type="submit" name="_method" value="update">Update product</Button>
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
