import mongoose from "mongoose";

import Chef from "../../../mongoDB/models/chef";

export async function getChefById(id: mongoose.Types.ObjectId) {
  const chef = await Chef.findById(id);
  return chef;
}

export async function getChefs() {
  const chefs = await Chef.find({ status: "Active" });
  return chefs;
}

export async function addChef(
  name: string,
  image: string,
  description: string
) {
  const chef = new Chef({
    name: name,
    image: image,
    description: description,
  });
  const newChef = await chef.save();
  return newChef;
}

export async function changeChef(
  id: mongoose.Types.ObjectId,
  name: string,
  image: string,
  description: string
) {
  const chef = await getChefById(id);

  if (chef == null) return null;

  chef.name = name;
  chef.image = image;
  chef.description = description;

  const updatedChef = await chef.save();
  return updatedChef;
}
export async function deleteChefById(id: mongoose.Types.ObjectId) {
  const chef = await getChefById(id);

  if (chef == null) return null;

  chef.status = "notActive";

  const updatedChef = await chef.save();
  return updatedChef;
}

export async function fullDeleteChefById(id: mongoose.Types.ObjectId) {
  const chef = await getChefById(id);

  if (chef == null) return null;

  await chef.deleteOne({ _id: chef.id });
  return chef;
}
