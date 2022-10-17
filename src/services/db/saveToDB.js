import Club from "../models/Club";

export default async (data) => {
  try {
    for (let i = 0; i < data.length; i++) {
      const club = await Club.findOne({ clubId: data[i].clubId });
      if (!club) await Club.create(data[i]);
    }
  } catch (error) {
    console.log({ message: "Unable to Save data to db" });
  }
};
