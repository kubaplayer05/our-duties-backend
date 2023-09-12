import express from "express";
import {getUserGroups, createGroup, deleteGroup, joinGroup} from "../controllers/groupController.js";

const router = express.Router()

router.get("/", getUserGroups)
router.get("/delete", deleteGroup)
router.post("/create", createGroup)
router.post("/join", joinGroup)

export default router