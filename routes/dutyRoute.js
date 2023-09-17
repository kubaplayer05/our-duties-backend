import express from "express";
import {getUserDutiesFromGroup, createDuty} from "../controllers/dutyController.js";

const router = express.Router()

router.get("/:groupId", getUserDutiesFromGroup)
router.post("/create", createDuty)

export default router
