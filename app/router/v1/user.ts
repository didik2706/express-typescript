import { Router } from "express";
import { UserController } from "../../controllers/User";

// initiate router
const router: Router = Router();

// Route GET
router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getDetailUser);

// Route POST
router.post("/", UserController.addUser);

export { router }