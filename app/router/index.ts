import { Router } from "express";

// import routes
import { router as v1 } from "./v1";

// initiate router
const router: Router = Router()

router.use("/v1", v1);

export { router }