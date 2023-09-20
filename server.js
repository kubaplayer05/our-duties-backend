import 'dotenv/config'

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import {authMiddleware} from "./middlewares/authMiddleware.js";
import userRoute from "./routes/userRoute.js"
import groupsRoute from "./routes/groupsRoute.js"
import dutyRoute from "./routes/dutyRoute.js";

const port = process.env.PORT

const app = express()

app.use(cors({origin: process.env.FRONTEND_APP_URL ,credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRoute)

app.use(authMiddleware)

app.use("/api/groups", groupsRoute)
app.use("/api/duties", dutyRoute)

app.listen(port, () => {
    console.log("Server just started on", port)
})