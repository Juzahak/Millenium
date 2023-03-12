import clientPromise from "../../../../util/mongo";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Millenium");

    db.collection("orders").insertOne({
      id_user: req.body.id_user,
      date: req.body.date,
      products: req.body.products,
      address: req.body.address,
      status: req.body.status,
    }).then((data) => {
      console.log(data)
    }).catch((err) => console.log(err));

    // res.json(getCustomerByID);
  } catch (e) {
    console.error(e);
  }
};
