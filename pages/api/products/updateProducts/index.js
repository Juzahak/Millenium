import clientPromise from "../../../../util/mongo";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Millenium");
    const objectid = new ObjectId(req.query.id);
    db.collection("products").updateOne({ _id: objectid }, {
      $set: {
        name: req.body.name,
        category: req.body.category,
        subcategory: req.body.subcategory,
        full_description: req.body.full_description,
        short_description: req.body.short_description,
        price: req.body.price,
        image: req.body.image,
        largura: req.body.largura,
        altura: req.body.altura,
        comprimento: req.body.comprimento,
        peso: req.body.peso,
        featured: req.body.featured,
        active: req.body.active,
      }
    });

  } catch (e) {
    console.error(e);
  }
};
