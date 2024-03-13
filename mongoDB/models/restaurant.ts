import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    restaurantSchemaInPut:
 *      type: object
 *      required:
 *        - name
 *        - stars
 *        - image
 *        - chef
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
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    restaurantSchemaOutPut:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - stars
 *        - image
 *        - chef
 *        - status
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
 *        status:
 *          type: Boolean
 *          default: true
 *        dishes:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/dishSchemaOutPut'
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
