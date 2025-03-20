import { UsersModels } from '../../models/users/usersModels.js'
import { logger } from '../../utils/logger/index.js'

const usersModels = new UsersModels()

export class UsersControllers {

    async add(request, reply) {
        try {
            const newUser = await usersModels.add(request.body)

            return reply.code(200).send({ message: 'Usuário adicionado com sucesso' })
        } catch (error) {
            if (error.message === 'Email já está em uso') {
                return reply.code(400).send({ message: error.message })
            }
            logger.error("Erro no add:", error);
            return reply.code(500).send({ message: 'Erro interno ao adicionar usuário' })
        }
    }

    async getAll(request, reply) {
        try {
            const users = await usersModels.getAll();

            return reply.code(200).send({
                message: 'Lista de usuários obtida com sucesso',
                users: users
            });

        } catch (error) {
            logger.error("Erro no getAll:", error);
            return reply.code(500).send({ message: 'Erro interno ao listar usuários' });
        }
    }

    async getById(request, reply) {
        try {
            const user = await usersModels.getById(request.params.id)

            if (!user) {
                return this.handleUserNotFound(reply)
            }

            return reply.code(200).send({
                message: 'Usuário obtido com sucesso',
                data: user
            })
        } catch (error) {
            logger.error("Erro no getById:", error);
            return reply.code(500).send({ message: 'Erro interno ao buscar usuário' })
        }
    }

    async update(request, reply) {
        try {
            const user = await usersModels.getById(request.params.id);

            if (!user) {
                return this.handleUserNotFound(reply)
            }

            const updatedUser = await usersModels.update(request.params.id, request.body);

            return reply.code(200).send({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            if (error.message === 'Email já está em uso') {
                logger.error("Erro no update, email já em uso:", error);
                return reply.code(400).send({ message: error.message });
            }

            logger.error("Erro no update:", error);
            return reply.code(500).send({ message: 'Erro interno ao atualizar usuário' });
        }
    }

    async delete(request, reply) {
        try {
            const user = await usersModels.getById(request.params.id);

            if (!user) {
                return this.handleUserNotFound(reply)
            }

            await usersModels.delete(user.id);

            return reply.code(200).send({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            logger.error('Erro ao deletar usuário:', error); // Para depurar erros
            return reply.code(500).send({ message: 'Erro interno ao deletar usuário' });
        }
    }

    // Funções auxiliares 
    handleUserNotFound(reply) {
        return reply.code(404).send({ message: 'Usuário não encontrado' })
    }

}