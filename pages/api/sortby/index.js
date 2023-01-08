import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import dayjs from "dayjs";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { fromDate, date, sortby, page, coords } = req.query;
    const PAGE_LIMIT = 20;
    const startIndex = (Number(page) - 1) * PAGE_LIMIT;

    if (sortby) {
      const eventTotal = await Event.countDocuments({
        startdate: { $gte: new Date() },
      });
      const events = await Event.find({ startdate: { $gte: new Date() } })
        .sort({ [sortby]: 1 })
        .limit(PAGE_LIMIT)
        .skip(startIndex);
      return res.status(200).json({
        events,
        currentPage: Number(page),
        numberOfPages: Math.ceil(eventTotal / PAGE_LIMIT),
      });
    }
    if (fromDate) {
      const eventTotal = await Event.countDocuments({
        startdate: { $gte: date },
      });
      const events = await Event.find({ startdate: { $gte: date } })
        .sort({ startdate: 1 })
        .limit(10);
      return res.status(200).json(events);
    }
    const events = await Event.find({
      startdate: {
        $gte: dayjs(date).startOf("date").toDate(),
        $lt: dayjs(date).endOf("date").toDate(),
      },
    });
    return res.status(200).json({
      events,
      currentPage: Number(page),
      numberOfPages: Math.ceil(eventTotal / PAGE_LIMIT),
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Could not get data by dates", error });
  }
}
