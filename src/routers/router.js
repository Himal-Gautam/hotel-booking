import express from "express";
import Room from "../models/room.js";
import Booking from "../models/booking.js";

const router = new express.Router();

router.post("/rooms", async (req, res) => {
  const room = new Room({
    ...req.body,
  });
  try {
    await room.save();
    res.status(201).send(room);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/bookings-allRooms", async (req, res) => {
  try {
    const rooms = await Room.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "roomID",
          as: "booking",
        },
      },
      {
        $project: {
          _id: 0,
          Room_Name: "$roomName",
          Bookings: "$booking",
        },
      },
    ]);

    console.log("as");
    if (!rooms) {
      return res.status(404).send("nothing found");
    }

    res.status(201).send(rooms);
  } catch (e) {
    res.status(400).send("error");
  }
});

router.post("/bookings", async (req, res) => {
  const booking = new Booking({
    ...req.body,
  });
  booking.startTime = new Date(booking.startTime);
  booking.endTime = new Date(booking.endTime);
  try {
    await booking.save();
    res.status(201).send(booking);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/bookings-customers", async (req, res) => {
  try {
    const customers = await Booking.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "roomID",
          foreignField: "_id",
          as: "room",
        },
      },
      { $unwind: "$room" },
      {
        $group: {
          _id: "$customerName",
          bookings: {
            $push: {
              Room_Name: "$room.roomName",
              Date: "$date",
              Start_Time: "$startTime",
              End_Time: "$endTime",
            },
          },
        },
      },
    ]);

    console.log("as");
    if (!customers) {
      return res.status(404).send("nothing found");
    }

    res.status(201).send(customers);
  } catch (e) {
    res.status(400).send("error");
  }
});

export default router;
