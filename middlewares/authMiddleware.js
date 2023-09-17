import {PrismaClient} from '@prisma/client'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const authMiddleware = async (req, res, next) => {

    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }

    const token = authorization.split(" ")[1]

    try {
        const {id} = jwt.verify(token, process.env.SECRET)
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            res.status(403).json({
                error: "Wrong authorization token"
            })
        }

        req.user = user
        next()
    } catch (err) {
        res.status(401).json({error: "Request is not authorized"})
    }
}