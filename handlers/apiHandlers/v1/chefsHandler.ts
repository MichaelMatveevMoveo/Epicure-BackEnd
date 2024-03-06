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
  const { id, ...chefRelevantDetails } = chefDetails;
  return await Chef.findByIdAndUpdate({ _id: id }, chefRelevantDetails, {
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

export async function getChefWithResturants(id: string) {
  const chefWithRestaurant = await Chef.findOne({ _id: id }).populate(
    "restaurants"
  );
  console.log(chefWithRestaurant);
  return chefWithRestaurant;
}

export async function chefWithResturntsAndDishes(id: string) {
  return await Chef.findOne({ _id: id }).populate({
    path: "restaurants",
    populate: "dishes",
  });
}

export async function allChefsWithResturntsAndDishes() {
  return await Chef.find().populate({
    path: "restaurants",
    populate: "dishes",
  });
}

export async function getChefsRejexInName(regex: RegExp) {
  return await Chef.find({ name: regex });
}

// export const x = async (status: string) => {
//   return Chef.aggregate([
//     {
//       $match: {
//         status,
//       },
//     },
//     {
//       $lookup: {
//         from: "restaurants",
//         localField: "_id",
//         foreignField: "chef",
//         as: "restaurants",
//       },
//     },
//   ]);
// };
