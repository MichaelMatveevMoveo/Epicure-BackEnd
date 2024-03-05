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
    required: true,
  },
  dishes: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
});

const Restaurant = mongoose.model("restaurantSchema", restaurantSchema);

async function getRestaurantById(id: mongoose.Types.ObjectId) {
  try {
    const restaurant = await Restaurant.findById(id);
    return { restaurant: restaurant, error: null };
  } catch (error) {
    return { restaurant: null, error: error };
  }
}

async function getRestaurants() {
  try {
    const restaurants = await Restaurant.find();
    return { restaurants: restaurants, error: null };
  } catch (error) {
    return { restaurants: [], error: error };
  }
}

async function addRestaurant(
  name: string,
  image: string,
  chef: mongoose.Types.ObjectId,
  dishes: [mongoose.Types.ObjectId]
) {
  const restaurant = new Restaurant({
    name: name,
    image: image,
    chef: chef,
    dishes: dishes,
  });
  try {
    console.log("in try");
    const newRestaurant = await restaurant.save();
    console.log("in try2");
    return { restaurant: newRestaurant, error: null };
  } catch (error) {
    console.log("in catch ");
    return { restaurant: null, error: error };
  }
}

async function changeRestaurant(
  id: mongoose.Types.ObjectId,
  name: string,
  image: string,
  chef: mongoose.Types.ObjectId,
  dishes: [mongoose.Types.ObjectId]
) {
  const { restaurant, error } = await getRestaurantById(id);

  if (!restaurant) return { restaurant: null, error: error };

  restaurant.name = name;
  restaurant.image = image;
  restaurant.chef = chef;
  restaurant.dishes = dishes;

  try {
    const updatedRestaurant = await restaurant.save();
    return { restaurant: updatedRestaurant, error: null };
  } catch (error) {
    return { restaurant: null, error: error };
  }
}

async function deleteRestaurantById(id: mongoose.Types.ObjectId) {
  const { restaurant, error } = await getRestaurantById(id);

  if (!restaurant) return { restaurant: null, error: error };

  try {
    await restaurant.deleteOne({ _id: restaurant.id });
    return { restaurant: restaurant, error: null };
  } catch (error) {
    return { restaurant: null, error: error };
  }
}

const addDishToRestaurant = async (
  restaurantId: mongoose.Types.ObjectId,
  dishId: mongoose.Types.ObjectId
) => {
  const { restaurant, error } = await getRestaurantById(restaurantId);
  if (!restaurant) return { restaurant: null, error: error };
  restaurant.dishes.push(dishId);

  try {
    const updatedRestaurant = await restaurant.save();
    return { restaurant: updatedRestaurant, error: null };
  } catch (error) {
    return { restaurant: null, error: error };
  }
};

const RemoveDishFromRestaurant = async (
  restaurantId: mongoose.Types.ObjectId,
  dishId: mongoose.Types.ObjectId
) => {
  const { restaurant, error } = await getRestaurantById(restaurantId);
  if (!restaurant) return { restaurant: null, error: error };

  let dishIndex = restaurant.dishes.indexOf(dishId);
  if (dishIndex === -1) return { restaurant: null, error: "dishID not found" };
  restaurant.dishes.splice(dishIndex, 1);

  try {
    const updatedRestaurant = await restaurant.save();
    return { restaurant: updatedRestaurant, error: null };
  } catch (error) {
    return { restaurant: null, error: error };
  }
};

module.exports = {
  getRestaurants,
  addRestaurant,
  getRestaurantById,
  changeRestaurant,
  deleteRestaurantById,
  addDishToRestaurant,
  RemoveDishFromRestaurant,
};
