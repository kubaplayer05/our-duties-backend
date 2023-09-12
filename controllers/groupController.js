import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export const getUserGroups = async (req, res) => {

    const {user} = req

    try {

        const {groups} = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                groups: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            }
        })

        res.status(200).json({
            groups
        })

    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err.message
        })
    }
}

export const createGroup = async (req, res) => {

    const {user} = req
    const {name, password} = req.body

    try {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const group = await prisma.group.create({
            data: {
                name: name,
                password: hash,
                users: {
                    connect: {
                        id: user.id
                    }
                },
                ownerId: user.id
            }
        })

        res.status(200).json({
            group
        })

    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err.message
        })
    }
}

export const deleteGroup = async (req, res) => {

    try {

        await prisma.group.deleteMany()

        res.status(200).json({
            msg: "deleted all groups"
        })

    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err.message
        })
    }
}

export const joinGroup = async (req, res) => {

    const {user} = req
    const {id, password} = req.body

    try {

        const {password: hash} = await prisma.group.findUnique({
            where: {
                id: id,
            },
            select: {
                password: true,
            }
        })

        const passwordCheck = await bcrypt.compare(password, hash)

        if (!passwordCheck) {
            throw Error("Wrong password")
        }


        const group = await prisma.group.update({
            where: {
                id: id,
            },
            data: {
                users: {
                    connect: {
                        id: user.id
                    }
                }
            },
            select: {
                name: true,
                createdBy: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                users: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            }
        })

        res.status(200).json({
            group
        })

    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err.message
        })
    }
}