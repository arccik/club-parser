import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import Venue from "../../../src/models/venue-model";
import dayjs from "dayjs";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { fromDate, date } = req.query;
    const { sortby } = req.query;
    const { venue } = req.query;

    const { page } = req.query;
    const { coords } = req.query;
    const PAGE_LIMIT = 20;
    const startIndex = (Number(page) - 1) * PAGE_LIMIT;

    if (venue) {
      if (fromDate) {
        const venueTotal = await Venue.countDocuments({
          date: { $gte: date },
        });
        const venues = await Venue.find({ date: { $gte: date } })
          .sort({ date: 1 })
          .limit(10);
        return res.status(200).json({
          venues,
          currentPage: Number(page),
          numberOfPages: Math.ceil(venueTotal / PAGE_LIMIT),
        });
      }
      if (sortby) {
        const venueTotal = await Venue.countDocuments({
          date: { $gt: new Date() },
        });
        const venues = await Venue.find({ startdate: { $gt: new Date() } })
          .sort({ [sortby]: 1 })
          .limit(PAGE_LIMIT)
          .skip(startIndex);
        return res.status(200).json({
          venues,
          currentPage: Number(page),
          numberOfPages: Math.ceil(venueTotal / PAGE_LIMIT),
        });
        // return res.status(200).json(events);
      }
    }

    if (sortby) {
      const eventTotal = await Event.countDocuments({
        startdate: { $gt: new Date() },
      });
      const events = await Event.find({ startdate: { $gt: new Date() } })
        .sort({ [sortby]: 1 })
        .limit(PAGE_LIMIT)
        .skip(startIndex);
      return res.status(200).json({
        events,
        currentPage: Number(page),
        numberOfPages: Math.ceil(eventTotal / PAGE_LIMIT),
      });
      // return res.status(200).json(events);
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
