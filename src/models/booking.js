import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  bookedStatus: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  startTime: {
    type: Date,
    required: true,
    // default: new Date(),
  },
  endTime: {
    type: Date,
    required: true,
    // default: DateTime.now()
  },
  roomID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Room",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
