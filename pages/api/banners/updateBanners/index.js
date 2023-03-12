import clientPromise from "../../../../util/mongo";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Millenium");
    const objectid = new ObjectId(req.query.id);
    db.collection("banners").updateOne({ _id: objectid }, {
      $set: {
      title: req.body.title,
      text: req.body.text,
      btnText: req.body.btnText,
      btnLink: req.body.btnLink,
      image: req.body.image,
      active: req.body.active,
      }
    });

  } catch (e) {
    console.error(e);
  }
};
