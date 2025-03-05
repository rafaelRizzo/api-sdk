import { PrismaClient } from '@prisma/client'
import { comparePassword } from '../../utils/bcrypt/index.js'
import { logger } from '../../utils/logger/index.js'

const prisma = new PrismaClient()

export class AuthModels {

    async login(data) {
        try {
            const findUser = await prisma.user.findUnique({
                where: {
                    email: data.email
                }
            })

            if (!findUser) {
                throw new Error('Usuário não encontrado');
            }

            const isPasswordValid = await comparePassword(data.password, findUser.password)

            if (!isPasswordValid) {
                throw new Error('Senha inválida')
            }

            return findUser;
        } catch (error) {
            throw error
        }
    }

    async updateToken(data) {
        try {
            const updateToken = await prisma.user.update({
                where: {
                    email: data.email
                },
                data: {
                    token: data.token
                }
            })

            logger.debug('Token atualizado com sucesso', updateToken)

            return true
        } catch (error) {
            throw error
        }
    }

}