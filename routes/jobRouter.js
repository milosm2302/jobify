import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router.get("/", getAllJobs);
router.route("/stats").get(showStats);
router.get("/:id", validateIdParam, getSingleJob);
router.post("/", checkForTestUser, validateJobInput, createJob);
router.delete("/:id", checkForTestUser, validateIdParam, deleteJob);
router.patch(
  "/:id",
  checkForTestUser,
  validateIdParam,
  validateJobInput,
  updateJob
);

export default router;
