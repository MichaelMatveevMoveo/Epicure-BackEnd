import mongoose from "mongoose";

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Active",
  },
});

const Chef = mongoose.model("Chef", chefSchema);

export default Chef;
