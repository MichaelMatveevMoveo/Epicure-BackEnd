import mongoose from "mongoose";

import Chef from "../../../mongoDB/models/chef";

export async function checkChefExist(id: string) {
  return await Chef.exists({ _id: id });
}

export async function getChefById(id: string) {
  const chef = await Chef.findById(id);
  return chef;
}

export async function getChefs() {
  return await Chef.find({ status: "Active" });
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
  return await chef.save();
}

export async function changeExistChef(chefDetails: {
  id: string;
  name: string;
  image: string;
  description: string;
}) {
  return await Chef.findByIdAndUpdate({ _id: chefDetails.id }, chefDetails, {
    new: true,
  });
}

export async function changeStatus(id: string, status: string) {
  const chef = await getChefById(id);

  if (chef == null) return null;

  chef.status = status;

  const updatedChef = await chef.save();
  return updatedChef;
}

export async function fullDeleteChefById(id: string) {
  const chef = await getChefById(id);

  if (!chef) return null;

  return chef.deleteOne({ _id: chef.id });
}
