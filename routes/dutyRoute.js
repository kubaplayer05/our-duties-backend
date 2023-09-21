import express from "express";
import {getUserDutiesFromGroup, createDuty, getUserDuties} from "../controllers/dutyController.js";

const router = express.Router()

router.get("/", getUserDuties)
router.get("/:groupId", getUserDutiesFromGroup)
router.post("/create", createDuty)

export default router
