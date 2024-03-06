import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Ingredients: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Active",
  },
});

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;
