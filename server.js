import 'dotenv/config'

import express from "express"
import cors from "cors"

import userRoute from "./routes/userRoute.js"
import groupsRoute from "./routes/groupsRoute.js"
import {authMiddleware} from "./middlewares/authMiddleware.js";

const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoute)

app.use(authMiddleware)

app.use("/api/groups", groupsRoute)

app.listen(port, () => {
    console.log("Server just started on", port)
})