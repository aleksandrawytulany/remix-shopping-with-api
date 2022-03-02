import { useLoaderData, redirect, Link } from "remix";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import LinkButton from "~/components/LinkButton.jsx";

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
    if (form.get("_method") === "delete") {
        await fetch(
            `http://localhost:3000/api/computers/${params.productId}`, {
                method: "DELETE"
            }
          );
      return redirect("/computers");
    }
  };

export default function Post() {
  const product = useLoaderData();

  return (
    <div>
      <Breadcrumb links={[{ to: "/computers", title: "Computers" }]} />
      <PageHeader title={product.title} />
      <p>{product.description}</p>
      <form method="post" className="mt-5 pt-2 border-t border-gray-200">
        <input type="hidden" name="_method" value="delete" />
        <Button type="submit" destructive>
          Delete
        </Button>
        <LinkButton to={"update"}>Update product</LinkButton>
      </form>
    </div>
  );
}