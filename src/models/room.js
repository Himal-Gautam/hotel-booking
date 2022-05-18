import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    default: "",
    required: true,
    trim: true,
  },
  seats: {
    type: Number,
    default: 1,
    required: true,
  },
  amenities: {
    type: String,
    default: "",
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
