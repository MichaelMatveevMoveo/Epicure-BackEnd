import mongoose from "mongoose";
/**
 * @openapi
 * components:
 *  schemas:
 *    dishSchemaInPut:
 *      type: object
 *      required:
 *        - name
 *        - price
 *        - Ingredients
 *        - tags
 *        - restaurant
 *      properties:
 *        name:
 *          type: string
 *          default: dish 1
 *        price:
 *          type: number
 *          default: 5
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

/**
 * @openapi
 * components:
 *  schemas:
 *    dishSchemaOutPut:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - price
 *        - Ingredients
 *        - tags
 *        - restaurant
 *        - status
 *      properties:
 *        name:
 *          type: string
 *          default: dish 1
 *        price:
 *          type: number
 *          default: 5
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
 *        status:
 *          type: string
 *          default: Active/noActive
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
  status: {
    type: String,
    required: true,
    default: "Active",
  },
});

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;
