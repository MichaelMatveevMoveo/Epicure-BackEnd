import { PipelineStage } from "mongoose";

export const getAllPopularRestWithTheChefName = (): PipelineStage[] => {
  return [
    {
      $match: {
        isPopular: true,
      },
    },
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
  ];
};
