import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getUserDutiesFromGroup = async (req, res) => {

    const {user} = req
    const {groupId} = req.params

    try {

        const duties = await prisma.duty.findMany({
            where: {
                userId: user.id,
                groupId
            }
        })

        res.status(200).json({
            duties
        })

    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}

export const createDuty = async (req, res) => {

    const {user: owner} = req
    const {name, groupId, priority, finishDate, userName} = req.body

    try {

        const {id: userId} = await prisma.user.findUnique({
            where: {
                name: userName
            },
            select: {
                id: true
            }
        })

        const duty = await prisma.duty.create({
            data: {
                name,
                groupId,
                priority,
                finishDate: new Date(finishDate),
                userId
            }
        })

        res.status(200).json({
            duty
        })

    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            error: err
        })
    }
}