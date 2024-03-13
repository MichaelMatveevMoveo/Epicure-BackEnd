import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    restaurantSchema:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - stars
 *        - image
 *        - chef
 *        - isActive
 *        - isPopular
 *        - signatureDishId
 *      properties:
 *        name:
 *          type: string
 *          default: res1
 *        stars:
 *          type: number
 *          default: 0
 *        image:
 *          type: string
 *          default: imageurl
 *        chef:
 *          type: string
 *          default: 65e9b3dcb63431b6e2e418a2
 *        id:
 *          type: string
 *          default: 65e9b3dcb63431b6e2e418a2
 *        isActive:
 *          type: Boolean
 *          default: true
 *        isPopular:
 *          type: Boolean
 *          default: false
 *        signatureDishId:
 *          type: string
 *          nullable: true
 *          default: 65e9b3dcb63431b6e2e418a2
 */

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chef",
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  isPopular: {
    type: Boolean,
    required: true,
    default: false,
  },
  signatureDishId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
});

restaurantSchema.virtual("dishes", {
  ref: "Dish",
  localField: "_id",
  foreignField: "restaurant",
});

restaurantSchema.set("toJSON", { virtuals: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;

/**
 * @openapi
 * definitions:
 *   CreatUpdateRestaurant:
 *     type: object
 *     required:
 *        - name
 *        - stars
 *        - image
 *        - chef
 *     properties:
 *        name:
 *          type: string
 *          default: res1
 *        stars:
 *          type: number
 *          default: 0
 *        image:
 *          type: string
 *          default: imageurl
 *        chef:
 *          type: string
 *          default: 65e9b3dcb63431b6e2e418a2
 */

/**
 * @openapi
 * definitions:
 *   restaurantsWithDishes:
 *     type: object
 *     required:
 *        - name
 *        - stars
 *        - image
 *        - chef
 *        - dishes
 *     properties:
 *        name:
 *          type: string
 *          default: res1
 *        stars:
 *          type: number
 *          default: 0
 *        image:
 *          type: string
 *          default: imageurl
 *        chef:
 *          type: string
 *          default: 65e9b3dcb63431b6e2e418a2
 *        dishes:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/dishSchema'
 */
