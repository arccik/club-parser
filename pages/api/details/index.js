export default async function handler(req, res) {
  const event = req.query;
  res.json({ message: "All OK!" });
}
