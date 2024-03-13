import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    dishSchema:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - price
 *        - image
 *        - Ingredients
 *        - tags
 *        - restaurant
 *        - isActive
 *      properties:
 *        name:
 *          type: string
 *          default: dish 1
 *        price:
 *          type: number
 *          default: 5
 *        image:
 *          type: string
 *          default: img 1
 *        Ingredients:
 *          type: array
 *          items:
 *            type: string
 *          default:
 *            - ingredient1
 *            - ingredient2
 *        tags:
 *          type: array
 *          items:
 *            type: string
 *          default:
 *            - tag1
 *            - tag2
 *        restaurant:
 *          type: string
 *          default: 65e9b3dcb63431b6e2e418a2
 *
 *        id:
 *          type: string
 *          default: 65e9b3dcb63431b6e2e418a2
 *        isActive:
 *          type: Boolean
 *          default: true
 */

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
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
    ref: "Restaurant",
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;

/**
 * @openapi
 * definitions:
 *   CreatUpdateDish:
 *     type: object
 *     required:
 *        - name
 *        - price
 *        - image
 *        - Ingredients
 *        - tags
 *        - restaurant
 *     properties:
 *        name:
 *          type: string
 *          default: dish 1
 *        price:
 *          type: number
 *          default: 5
 *        image:
 *          type: string
 *          default: img 1
 *        Ingredients:
 *          type: array
 *          items:
 *            type: string
 *          default:
 *            - ingredient1
 *            - ingredient2
 *        tags:
 *          type: array
 *          items:
 *            type: string
 *          default:
 *            - tag1
 *            - tag2
 *        restaurant:
 *          type: string
 *          default: 65e9b3dcb63431b6e2e418a2
 */
