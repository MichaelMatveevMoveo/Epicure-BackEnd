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
    ref: "Chef",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Active",
  },
});

restaurantSchema.virtual("dishes", {
  ref: "Dish",
  localField: "_id",
  foreignField: "restaurant",
});

restaurantSchema.set("toJSON", { virtuals: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
