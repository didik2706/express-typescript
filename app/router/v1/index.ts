import { Router } from "express";

// import routes
import { router as user } from "./user";

// initate router
const router: Router = Router();

// list routes
router.use("/users", user);

export { router }