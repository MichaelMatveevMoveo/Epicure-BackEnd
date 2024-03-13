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
  return await Chef.find({ isActive: true });
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

export async function changeStatus(id: string, isActive: boolean) {
  const chef = await getChefById(id);

  if (chef == null) return null;

  chef.isActive = isActive;

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

export async function getChefWithResturantsAgr(id: string) {
  return await Chef.aggregate([
    {
      $match: {
        isActive: true,
      },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "_id",
        foreignField: "chef",
        as: "restaurants",
      },
    },
  ]);
}

export async function chefWithResturntsAndDishesAgr(id: string) {
  return await Chef.aggregate([
    {
      $match: {
        isActive: true,
      },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "_id",
        pipeline: [
          {
            $match: {
              isActive: true,
            },
          },
          {
            $lookup: {
              from: "dishes",
              localField: "_id",
              foreignField: "restaurant",
              as: "dishes",
            },
          },
        ],
        foreignField: "chef",
        as: "restaurants",
      },
    },
  ]);
}

export async function allChefsWithResturntsAndDishesAgr() {
  return await Chef.aggregate([
    {
      $match: {
        isActive: true,
      },
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "_id",
        pipeline: [
          {
            $match: {
              isActive: true,
            },
          },
          {
            $lookup: {
              from: "dishes",
              localField: "_id",
              foreignField: "restaurant",
              as: "dishes",
            },
          },
        ],
        foreignField: "chef",
        as: "restaurants",
      },
    },
  ]);
}
