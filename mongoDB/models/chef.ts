import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    chefSchemaInPut:
 *      type: object
 *      required:
 *        - name
 *        - image
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: yossi
 *        image:
 *          type: string
 *          default: imageurl
 *        description:
 *          type: string
 *          default: description for yossi
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    chefSchemaOutPut:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - image
 *        - description
 *        - status
 *      properties:
 *        name:
 *          type: string
 *          default: yossi
 *        image:
 *          type: string
 *          default: imageurl
 *        description:
 *          type: string
 *          default: description for yossi
 *        id:
 *          type: string
 *          default: 65e9b3dcb63431b6e2e418a2
 *        status:
 *          type: string
 *          default: Active/noActive
 *        restaurants:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/restaurantSchemaOutPut'
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
  status: {
    type: String,
    required: true,
    default: "Active",
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
