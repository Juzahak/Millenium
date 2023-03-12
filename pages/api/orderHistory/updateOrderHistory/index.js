import clientPromise from "../../../../util/mongo";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Millenium");
    const objectid = new ObjectId(req.query.id);

    db.collection("orders").updateOne({ _id: objectid }, {
      $set: {
        id_user: req.body.id_user,
        date: req.body.date,
        products: req.body.products,
        address: req.body.address,
        status: req.body.status,
      }
    });

  } catch (e) {
    console.error(e);
  }
};
