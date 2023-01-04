export default async function handler(req, res) {
  const { user } = req.query;
  const ADMINS = ["arccik@gmail.com"];
  if (ADMINS.includes(user)) {
    return res.status(200).json({ role: "ADMIN", user });
  }
  return res.status(200).json({ role: null });
}
