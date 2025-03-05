import { UsersModels } from '../../models/users/usersModels.js'

const usersModels = new UsersModels()

export class UsersControllers {

    async add(request, reply) {
        try {
            const newUser = await usersModels.add(request.body)

            return reply.code(200).send({
                message: 'Usuário adicionado com sucesso',
                data: newUser
            })
        } catch (error) {
            if (error.message === 'Email já está em uso') {
                return reply.code(400).send({ message: error.message })
            }

            return reply.code(500).send({ message: 'Erro interno ao adicionar usuário' })
        }
    }

    async getAll(request, reply) {
        try {
            const users = await usersModels.getAll()

            return reply.code(200).send({
                message: 'Lista de usuários obtida com sucesso',
                users: users
            })

        } catch (error) {
            return reply.code(500).send({ message: 'Erro interno ao listar usuários' })
        }
    }

    async getById(request, reply) {
        try {
            const user = await usersModels.getById(request.params.id)

            if (!user) {
                return reply.code(404).send({ message: 'Usuário não encontrado' })
            }

            return reply.code(200).send({
                message: 'Usuário obtido com sucesso',
                data: user
            })
        } catch (error) {
            return reply.code(500).send({ message: 'Erro interno ao buscar usuário' })
        }
    }

    async delete(request, reply) {
        try {
            const deleted = await usersModels.delete(request.params.id)

            if (!deleted) {
                return reply.code(404).send({ message: 'Usuário não encontrado' })
            }

            return reply.code(200).send({ message: 'Usuário deletado com sucesso' })
        } catch (error) {
            return reply.code(500).send({ message: 'Erro interno ao deletar usuário' });
        }
    }

    async update(request, reply) {
        try {
            const updatedUser = await usersModels.update(request.params.id, request.body);

            if (!updatedUser) {
                return reply.code(404).send({ message: 'Usuário não encontrado' });
            }

            return reply.code(200).send({
                message: 'Usuário atualizado com sucesso',
                data: updatedUser
            });
        } catch (error) {
            if (error.message === 'Email já está em uso') {
                return reply.code(400).send({ message: error.message });
            }

            return reply.code(500).send({ message: 'Erro interno ao atualizar usuário' });
        }
    }
}