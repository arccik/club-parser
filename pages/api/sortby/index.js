import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import Venue from "../../../src/models/venue-model";
import dayjs from "dayjs";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { fromDate, date } = req.query;
    const { sortby } = req.query;

    const { page } = req.query;
    const { coords } = req.query;
    const PAGE_LIMIT = 20;
    const startIndex = (Number(page) - 1) * PAGE_LIMIT;

    if (sortby) {
      const events = await Event.find()
        .sort({ [sortby]: 1 })
        .limit(PAGE_LIMIT)
        .skip(startIndex);
      return res.status(200).json(events);
    }
    if (fromDate) {
      const events = await Event.find()
        .sort({ startdate: 1 })
        .where({
          startdate: {
            $gte: dayjs(date).startOf("date").toDate(),
          },
        })
        .limit(10);
      return res.status(200).json(events);
    }
    const events = await Event.find({
      startdate: {
        $gte: dayjs(date).startOf("date").toDate(),
        $lt: dayjs(date).endOf("date").toDate(),
      },
    });
    return res.status(200).json(events);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Could not get data by dates", error });
  }
}
