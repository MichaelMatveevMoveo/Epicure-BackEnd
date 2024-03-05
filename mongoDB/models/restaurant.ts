import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Active",
  },
});

const Restaurant = mongoose.model("restaurantSchema", restaurantSchema);

export default Restaurant;
