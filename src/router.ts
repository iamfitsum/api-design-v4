import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdates,
  getOneUpdate,
  updateUpdate,
} from "./handlers/update";
import {
  createUpdatePoint,
  deleteUpdatePoint,
  getAllUpdatePoints,
  getOneUpdatePoint,
  updateUpdatePoint,
} from "./handlers/updatePoint";

const router = Router();

{
  /* Product */
}
router.get("/product", getAllProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").exists().isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

{
  /* Update */
}
router.get("/update", getAllUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("productId").exists().isString(),
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status")
    .optional()
    .isIn(["IN_PROGRESS", "LIVE", "DEPRECATED", "ARCHIVED"]),
  body("version").optional().isString(),
  body("asset").optional().isString(),
  handleInputErrors,
  updateUpdate
);
router.post(
  "/update",
  body("productId").exists().isString(),
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("status")
    .optional()
    .isIn(["IN_PROGRESS", "LIVE", "DEPRECATED", "ARCHIVED"]),
  body("version").optional().isString(),
  body("asset").optional().isString(),
  handleInputErrors,
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

{
  /* Update Points */
}
router.get(
  "/updatepoint",
  body("updateId").exists().isString(),
  getAllUpdatePoints
);
router.get("/updatepoint/:id", getOneUpdatePoint);
router.put(
  "/updatepoint/:id",
  body("updateId").exists().isString(),
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  updateUpdatePoint
);
router.post(
  "/updatepoint",
  body("updateId").exists().isString(),
  body("name").exists().isString(),
  body("description").exists().isString(),
  handleInputErrors,
  createUpdatePoint
);
router.delete(
  "/updatepoint/:id",
  body("updateId").exists().isString(),
  deleteUpdatePoint
);

export default router;
