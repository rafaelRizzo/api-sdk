import { UsersControllers } from '../../controllers/users/usersController.js'
import {
    createUserSchema,
    getAllUsersSchema,
    getUserByIdSchema,
    updateUserSchema,
    deleteUserSchema
} from './schemas/usersSchemas.js'

// Instancia o controller
const usersController = new UsersControllers();

export const usersRoutes = async (fastify, options) => {
    fastify.post('/users', { schema: createUserSchema }, async (request, reply) => {
        return await usersController.add(request, reply)
    });

    fastify.get('/users', { schema: getAllUsersSchema }, async (request, reply) => {
        return await usersController.getAll(request, reply)
    });

    fastify.get('/users/:id', { schema: getUserByIdSchema }, async (request, reply) => {
        return await usersController.getById(request, reply)
    });

    fastify.put('/users/:id', { schema: updateUserSchema }, async (request, reply) => {
        return await usersController.update(request, reply)
    });

    fastify.delete('/users/:id', { schema: deleteUserSchema }, async (request, reply) => {
        return await usersController.delete(request, reply)
    });
};