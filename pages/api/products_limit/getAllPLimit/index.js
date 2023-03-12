import clientPromise from "../../../../util/mongo";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Millenium");

    const result = req.query.busca;
    const productData = await db.collection("products").find({
      active: '1',
      $or: [
        { name: { $regex: result } },
        { full_description: { $regex: result } },
        { short_description: { $regex: result } },
        { id: { $regex: result } }
      ]
    }).sort({ id: -1 }).toArray();

    res.json(productData);
  } catch (e) {
    console.error(e);
  }
};