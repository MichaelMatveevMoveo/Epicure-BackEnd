import mongoose, { PipelineStage } from "mongoose";
import Restaurant from "../../../mongoDB/models/restaurant";
import { getAllPopularRestWithTheChefName } from "../../../aggregations/resturant.aggregation";

export async function getRestaurantById(id: mongoose.Types.ObjectId) {
  const restaurant = await Restaurant.findById(id);
  return restaurant;
}

export async function getRestaurants() {
  const restaurants = await Restaurant.find({ isActive: true });
  return restaurants;
}

export async function addRestaurant(
  name: string,
  stars: number,
  image: string,
  chef: mongoose.Types.ObjectId
) {
  const restaurant = new Restaurant({
    name: name,
    stars: stars,
    image: image,
    chef: chef,
  });

  const newRestaurant = await restaurant.save();
  return newRestaurant;
}

export async function changeRestaurant(
  id: mongoose.Types.ObjectId,
  name: string,
  stars: number,
  image: string,
  chef: mongoose.Types.ObjectId,
  signatureDishId: mongoose.Types.ObjectId
) {
  const restaurant = await getRestaurantById(id);

  if (restaurant == null) return null;

  restaurant.name = name;
  restaurant.stars = stars;
  restaurant.image = image;
  restaurant.chef = chef;
  if (signatureDishId) {
    restaurant.signatureDishId = signatureDishId;
  }

  const updatedRestaurant = await restaurant.save();
  return updatedRestaurant;
}
export async function changeStatus(
  id: mongoose.Types.ObjectId,
  isActive: boolean
) {
  const restaurant = await getRestaurantById(id);

  if (restaurant == null) return null;
  restaurant.isActive = isActive;
  const updatedRestaurant = await restaurant.save();
  return updatedRestaurant;
}

export async function fullDeleteRestaurantById(id: mongoose.Types.ObjectId) {
  const restaurant = await getRestaurantById(id);

  if (restaurant == null) return null;

  await restaurant.deleteOne({ _id: restaurant.id });
  return restaurant;
}

export async function getRestaurantWithDishesById(id: mongoose.Types.ObjectId) {
  const restaurant = await Restaurant.findById(id).populate("dishes");
  return restaurant;
}

export async function getRestaurantsRejexInName(regex: RegExp) {
  return await Restaurant.find({ name: regex });
}

export async function getRestaurantForChefByHisId(
  chefId: mongoose.Types.ObjectId
) {
  return await Restaurant.find({ chef: chefId }).select("name _id image");
}

export async function getpopularRestaurants() {
  return await Restaurant.find({ isPopular: true });
}

export async function getpopularRestaurantsNameAndChef() {
  return await Restaurant.aggregate([
    ...getAllPopularRestWithTheChefName(),
    {
      $project: {
        name: 1,
        image: 1,
        chef: 1,
        stars: 1,
      },
    },
  ]);
}

export async function getSignatureDishAll() {
  return await Restaurant.aggregate([
    {
      $match: {
        signatureDishId: {
          $ne: null,
        },
      },
    },
    {
      $lookup: {
        from: "dishes",
        localField: "signatureDishId",
        foreignField: "_id",
        as: "dishes",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $arrayElemAt: ["$dishes", 0],
        },
      },
    },
  ]);
}

export async function getCollectionSize() {
  return await Restaurant.countDocuments({});
}

export async function getPartOfItems(offset: number, limit: number) {
  return await Restaurant.find({}).skip(offset).limit(limit);
}

export async function getRestaurantsWithChefNameAndsignatureDishName() {
  return await Restaurant.aggregate([
    {
      $lookup: {
        from: "chefs",
        localField: "chef",
        foreignField: "_id",
        as: "chef",
      },
    },
    {
      $addFields: {
        chef: {
          $arrayElemAt: ["$chef.name", 0],
        },
      },
    },
    {
      $lookup: {
        from: "dishes",
        localField: "signatureDishId",
        foreignField: "_id",
        as: "signatureDishId",
      },
    },
    {
      $addFields: {
        signatureDishId: {
          $arrayElemAt: ["$signatureDishId.name", 0],
        },
      },
    },
  ]);
}
