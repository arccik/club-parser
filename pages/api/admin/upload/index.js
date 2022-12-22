import {
  uploadFile,
  generateUploadUrl,
} from "../../../../src/services/s3-backet";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET")
      return res.status(503).json({ message: "Wrong Request method" });
    const uploadLink = await generateUploadUrl();
    return res.status(200).json(uploadLink);
  } catch (error) {
    console.log("Error during uploading", error);
    return res.status(200).json({ message: "Error during uploading." });
  }
}
