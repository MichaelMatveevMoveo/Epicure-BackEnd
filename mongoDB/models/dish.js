const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Ingredients: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Dish = mongoose.model("Dish", dishSchema);

async function getDishById(id) {
  try {
    const dish = await Dish.findById(id);
    return { dish: dish, error: null };
  } catch (error) {
    return { dish: null, error: error };
  }
}

async function getDishes() {
  try {
    const dishes = await Dish.find();
    return { dishes: dishes, error: null };
  } catch (error) {
    return { dishes: [], error: error };
  }
}

async function addDish(name, price, Ingredients, tags, restaurant) {
  const dish = new Dish({
    name: name,
    price: price,
    Ingredients: Ingredients,
    tags: tags,
    restaurant: restaurant,
  });
  try {
    console.log("in try");
    const newDish = await dish.save();
    console.log("in try2");
    return { dish: newDish, error: null };
  } catch (error) {
    console.log("in catch ");
    return { dish: null, error: error };
  }
}

async function changeDish(id, name, price, Ingredients, tags, restaurant) {
  const { dish, error } = await getDishById(id);

  if (!dish) return { dish: null, error: error };

  if (name) dish.name = name;
  if (price) dish.price = price;
  if (Ingredients) dish.Ingredients = Ingredients;
  if (tags) dish.tags = tags;
  if (restaurant) dish.restaurant = restaurant;

  try {
    const updatedDish = await dish.save();
    return { dish: updatedDish, error: null };
  } catch (error) {
    return { dish: null, error: error };
  }
}

async function deleteDishById(id) {
  const { dish, error } = await getDishById(id);

  if (!dish) return { dish: null, error: error };

  try {
    await dish.deleteOne(dish);
    return { dish: dish, error: null };
  } catch (error) {
    return { dish: null, error: error };
  }
}

module.exports = {
  getDishes,
  addDish,
  getDishById,
  changeDish,
  deleteDishById,
};
