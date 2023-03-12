import clientPromise from "../../../../util/mongo";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Millenium");
    const objectid = new ObjectId(req.query.id);
    
    db.collection("colors").updateOne({ _id: objectid }, {
      $set: {
        name: req.body.name,
        color: req.body.color,
      }
    });

  } catch (e) {
    console.error(e);
  }
};
