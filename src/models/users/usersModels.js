import { PrismaClient } from '@prisma/client'
import { generateHash } from '../../utils/bcrypt/index.js'
import logger from '../../utils/logger/index.js'

// Instancia o Prisma Client
const prisma = new PrismaClient()

export class UsersModels {

    async add(data) {
        const cryptedPass = await generateHash(data.password)

        if (!cryptedPass) {
            throw new Error('Erro ao gerar hash da senha')
        }

        try {
            const newUser = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: cryptedPass,
                }
            })

            return newUser
        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error('Email já está em uso')
            }

            throw error
        }
    }

    async getAll() {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            })

            return users
        } catch (error) {
            throw error
        }
    }

    async getById(id) {
        try {
            const userId = id

            const user = await prisma.user.findUnique({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                },
                where: { id: userId }
            })

            return user || null
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const userId = id

            await prisma.user.delete({
                where: { id: userId }
            })

            return true
        } catch (error) {
            if (error.code === 'P2025') {
                return false
            }

            throw error
        }
    }

    async update(id, data) {
        try {
            const userId = id

            const updateData = {}

            if (data.name) {
                updateData.name = data.name
            }

            if (data.email) {
                updateData.email = data.email
            }

            if (data.password) {
                updateData.password = generateHash(data.password)
            }

            // Faz o update dinâmico
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: updateData
            });

            return updatedUser

        } catch (error) {
            if (error.code === 'P2025') {
                return null
            }

            if (error.code === 'P2002') {
                throw new Error('Email já está em uso')
            }

            throw error
        }
    }
}