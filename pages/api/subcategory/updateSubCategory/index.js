import clientPromise from "../../../../util/mongo";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Millenium");
    const objectid = new ObjectId(req.query.id);

    db.collection("sub_category").updateOne({ _id: objectid }, {
      $set: {
        name: req.body.name,
        main_category: req.body.mainCategory,
        active: req.body.active,
      }
    });

  } catch (e) {
    console.error(e);
  }
};
