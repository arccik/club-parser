import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import dayjs from "dayjs";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { fromDate, date, sortby, page, coords } = req.query;
    const PAGE_LIMIT = 12;
    const startIndex = (Number(page) - 1) * PAGE_LIMIT;
    if (sortby == "date" && !fromDate) {
      console.log("ReanDer>> .. . D d", sortby, fromDate);
      const eventTotal = await Event.find({
        startdate: {
          $gte: dayjs(date).startOf("date").toDate(),
          $lte: dayjs(date).endOf("date").toDate(),
        },
      }).count();

      const events = await Event.find({
        startdate: {
          $gte: dayjs(date).startOf("date").toDate(),
          $lte: dayjs(date).endOf("date").toDate(),
        },
      })
        .skip(startIndex)
        .limit(PAGE_LIMIT);
      return res.status(200).json({
        events,
        currentPage: Number(page),
        numberOfPages: Math.ceil(eventTotal / PAGE_LIMIT),
      });
    }
    console.log("Jaicaaaa", date, fromDate);
    if (fromDate && sortby == "date") {
      return res.status(200).json({ message: "ALl OK " });
      // if (!date) {
      //   return res.status(404).json({ message: "Date wasnt not provided" });
      // }
      // const eventTotal = await Event.countDocuments({
      //   startdate: { $gte: Date(date) },
      // });
      // const events = await Event.find({ startdate: { $gte: Date(date) } }).sort(
      //   {
      //     startdate: 1,
      //   }
      // );

      // return res.status(200).json({
      //   events,
      //   currentPage: Number(page),
      //   numberOfPages: Math.ceil(eventTotal / PAGE_LIMIT),
      // });
    }

    if (sortby === "distance") {
      const eventTotal = await Event.countDocuments({
        startdate: { $gte: new Date() },
      });
      if (!coords) {
        const events = await Event.find({
          startdate: { $gte: new Date() },
        }).limit(20);
        return res.status(200).json({
          events,
          currentPage: Number(page),
          numberOfPages: Math.ceil(eventTotal / PAGE_LIMIT),
        });
      }
      const location = coords.split(",").map(Number);

      const events = await Event.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: location,
            },
            spherical: true,
            distanceField: "distance",
            distanceMultiplier: 0.001,
          },
        },
        { $match: { startdate: { $gte: new Date() } } },
        { $skip: startIndex },
        { $limit: PAGE_LIMIT },
      ]);

      return res.status(200).json({
        events,
        currentPage: Number(page),
        numberOfPages: Math.ceil(eventTotal / PAGE_LIMIT),
      });
    }

    if (sortby === "name" || sortby === "price") {
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
    return res.status(404).json({ message: "Nothing was found" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Could not get data by dates", error });
  }
}
