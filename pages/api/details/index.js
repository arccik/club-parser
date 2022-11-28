export default async function handler(req, res) {
  const event = req.query;
  console.log("QUerty ", event);
  res.json({ message: "All OK!" });
}
