import db from "~/db/computers/db.server.js";

export async function loader({ params }) {
  const product = db.data.products?.find((p) => p.id === params.productId);
  return product;
}

export const action = async ({
    request, params,
  }) => {
    switch (request.method) {
        case "PUT": {
                const body = await request.json();
                const updatedProduct = { id: productId, title: body.title, description: body.description };
                db.data.products = db.data.products.find((p) => p.id == params.productId);
                db.data.products.push(updatedProduct);
                db.write();
                  return json(updatedProduct, {
                    status: 200,
                });    
          }
        case "DELETE": {
                    db.data.products = db.data.products.filter((p) => p.id !== params.productId);
                    db.write();
                    // throw new Error("Delete not implemented");
                    return new Response(null, {
                        status: 204,
                    });
        }
    }
}