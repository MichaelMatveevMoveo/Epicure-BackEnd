import Chef from "../../../mongoDB/models/chef";
import { getChefsRejexInName } from "./chefsHandler";
import { getRestaurantsRejexInName } from "./restaurantsHandler";
import { getDishesRejexInName } from "./dishHandler";

export async function getChefsRestAndDishStartWith(prefix: string) {
  const chefs = await getChefsRejexInName(new RegExp("^" + prefix, "i"));
  const restaurants = await getRestaurantsRejexInName(
    new RegExp("^" + prefix, "i")
  );
  const dishes = await getDishesRejexInName(new RegExp("^" + prefix, "i"));
  return { chefs, restaurants, dishes };
}

export async function getChefsRestAndDishStartWithagr(prefix: string) {
  return await Chef.aggregate([
    {
      $match: {
        name: new RegExp(`^${prefix}`, "i"),
      },
    },
    {
      $unionWith: {
        coll: "restaurants",
        pipeline: [
          {
            $match: {
              name: new RegExp(`^${prefix}`, "i"),
            },
          },
        ],
      },
    },
    {
      $unionWith: {
        coll: "dishes",
        pipeline: [
          {
            $match: {
              name: new RegExp(`^${prefix}`, "i"),
            },
          },
        ],
      },
    },
  ]);
}
