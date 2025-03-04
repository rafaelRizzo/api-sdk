import { PrismaClient } from '@prisma/client';

// Instancia o Prisma Client
const prisma = new PrismaClient();

export class UsersModels {
    // Adiciona um novo usuário
    async add(data) {
        try {
            const newUser = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email
                }
            });
            return newUser;
        } catch (error) {
            // Trata erro de email duplicado (violação de unicidade)
            if (error.code === 'P2002') {
                throw new Error('Email já está em uso');
            }
            throw error; // Propaga outros erros
        }
    }

    // Retorna todos os usuários
    async getAll() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            throw error; // Propaga o erro para ser tratado pelo chamador
        }
    }

    // Busca um usuário por ID
    async getById(id) {
        try {
            const userId = Number(id);
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });
            return user || null;
        } catch (error) {
            throw error; // Propaga o erro para ser tratado pelo chamador
        }
    }

    // Deleta um usuário por ID
    async delete(id) {
        try {
            const userId = Number(id);
            await prisma.user.delete({
                where: { id: userId }
            });
            return true;
        } catch (error) {
            if (error.code === 'P2025') { // Erro de "registro não encontrado"
                return false;
            }
            throw error; // Propaga outros erros
        }
    }

    // Atualiza um usuário por ID
    async update(id, data) {
        try {
            const userId = Number(id);
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    name: data.name,
                    email: data.email
                }
            });
            return updatedUser;
        } catch (error) {
            if (error.code === 'P2025') { // Erro de "registro não encontrado"
                return null;
            }
            if (error.code === 'P2002') { // Erro de email duplicado
                throw new Error('Email já está em uso');
            }
            throw error; // Propaga outros erros
        }
    }

    // Método para desconectar o Prisma (opcional, usado no shutdown)
    async disconnect() {
        try {
            await prisma.$disconnect();
        } catch (error) {
            throw error; // Propaga o erro para ser tratado no shutdown
        }
    }
}