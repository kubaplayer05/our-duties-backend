import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {expiresIn: "1h"})
}

export const signup = async (req, res) => {

    const {email, name, password} = req.body

    if (!email || !name || !password) {
        return res.status(400).json({
            error: "All data must be provided"
        })
    }

    const dataInUse = await prisma.user.findFirst({
        where: {
            OR: [
                {name: name},
                {email: email}
            ]
        }
    })

    if (dataInUse) {
        return res.status(400).json({
            error: "Name and Email must be unique"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: hash
        }
    })

    if (!user) {
        return res.status(400).json({error: "Could not create user"})
    }

    const token = createToken(user.id)

    res.status(200).json({
        email,
        name,
        token
    })
}

export const login = async (req, res) => {

    const {email, password} = req.body

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw Error("Wrong email")
        }

        const {password: hash, name, id} = user

        const check = await bcrypt.compare(password, hash)

        if (!check) {
            throw Error("Wrong password")
        }

        const token = createToken(id)

        res.status(200).json({
            email,
            name,
            token
        })

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}