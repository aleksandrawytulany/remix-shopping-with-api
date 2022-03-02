import db from "~/db/computers/db.server.js";
import { json } from "remix";

export async function loader() {
  return db.data.products ?? [];
}

export const action = async ({
    request, params,
  }) => {
    switch (request.method) {
      case "POST": {
            const uuid = new Date().getTime().toString(16);
            const body = await request.json();
            const newProduct = { id: uuid, title: body.title, description: body.description };
            db.data.products.push(newProduct);
            db.write();
        //   throw new Error("POST handler not implemented");
            return json(newProduct, {
                status: 201,
            });
        }
    }
};