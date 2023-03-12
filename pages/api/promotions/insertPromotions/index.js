import clientPromise from "../../../../util/mongo";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Millenium");

    db.collection("promotions").insertOne({
      title: req.body.title,
      text: req.body.text,
      btnText: req.body.btnText,
      btnLink: req.body.btnLink,
      image: req.body.image,
      active: req.body.active,
    }).then((data) => {
      console.log(data)
    }).catch((err) => console.log(err));

    // res.json(getCustomerByID);
  } catch (e) {
    console.error(e);
  }
};
