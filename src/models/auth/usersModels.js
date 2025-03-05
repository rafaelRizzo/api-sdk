import { PrismaClient } from '@prisma/client';

// Instancia o Prisma Client
const prisma = new PrismaClient();

export class AuthModels {

    async login(data) {
        try {
            const findUser = await prisma.user.findUnique({
                data: {
                    email: data.email,
                    password: data.password,
                }
            });

            if (!findUser) {
                throw new Error('Usuário não encontrado');
            }

            return findUser;
        } catch (error) {
            throw error;
        }
    }

}