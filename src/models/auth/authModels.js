import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class AuthModels {

    async login(data) {
        try {
            const findUser = await prisma.user.findUnique({
                data: {
                    email: data.email
                }
            })

            if (!findUser) {
                throw new Error('Usuário não encontrado');
            }

            const isPasswordValid = await comparePassword(data.password, findUser.password);

            if (!isPasswordValid) {
                throw new Error('Senha inválida');
            }

            return findUser;
        } catch (error) {
            throw error
        }
    }

}