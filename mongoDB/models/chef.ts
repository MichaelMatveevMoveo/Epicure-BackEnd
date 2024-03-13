import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    chefSchema:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - image
 *        - description
 *        - isActive
 *        - isChefOfWeek
 *      properties:
 *        id:
 *          type: string
 *          example: "65e9b3dcb63431b6e2e418a2"
 *        name:
 *          type: string
 *          example: "Yossi"
 *        image:
 *          type: string
 *          example: "imageurl"
 *        description:
 *          type: string
 *          example: "Description for Yossi"
 *        isActive:
 *          type: boolean
 *          default: true
 *        isChefOfWeek:
 *          type: boolean
 *          default: true
 */

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  isCeffOfWeek: {
    type: Boolean,
    required: true,
    default: false,
  },
});

chefSchema.virtual("restaurants", {
  ref: "Restaurant",
  localField: "_id",
  foreignField: "chef",
});

chefSchema.set("toJSON", { virtuals: true });

const Chef = mongoose.model("Chef", chefSchema);

export default Chef;
/**
 * @openapi
 * definitions:
 *   CreatUpdateChef:
 *     type: object
 *     required:
 *       - name
 *       - image
 *       - description
 *     properties:
 *       name:
 *         type: string
 *         default: "yossi"
 *       image:
 *         type: string
 *         default: "imageurl"
 *       description:
 *         type: string
 *         default: "description for yossi"
 */

/**
 * @openapi
 * definitions:
 *   chefWithRestaurants:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - image
 *       - description
 *       - isActive
 *       - isChefOfWeek
 *       - restaurants
 *     properties:
 *       id:
 *         type: string
 *         example: "65e9b3dcb63431b6e2e418a2"
 *       name:
 *         type: string
 *         example: "Yossi"
 *       image:
 *         type: string
 *         example: "imageurl"
 *       description:
 *         type: string
 *         example: "Description for Yossi"
 *       isActive:
 *         type: boolean
 *         default: true
 *       isChefOfWeek:
 *         type: boolean
 *         default: true
 *       restaurants:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/restaurantSchema'
 */

/**
 * @openapi
 * definitions:
 *   chefWithRestaurantsWithDishes:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - image
 *       - description
 *       - isActive
 *       - isChefOfWeek
 *       - restaurants
 *     properties:
 *       id:
 *         type: string
 *         example: "65e9b3dcb63431b6e2e418a2"
 *       name:
 *         type: string
 *         example: "Yossi"
 *       image:
 *         type: string
 *         example: "imageurl"
 *       description:
 *         type: string
 *         example: "Description for Yossi"
 *       isActive:
 *         type: boolean
 *         default: true
 *       isChefOfWeek:
 *         type: boolean
 *         default: true
 *       restaurants:
 *         type: array
 *         items:
 *          $ref: '#/definitions/restaurantsWithDishes'
 */
