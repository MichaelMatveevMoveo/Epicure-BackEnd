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
});

const Restaurant = mongoose.model("restaurantSchema", restaurantSchema);

export default Restaurant;
