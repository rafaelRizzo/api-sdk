// src/routes/users/usersRoutes.js
import { UsersControllers } from '../../controllers/users/usersController.js';
import {
    createUserSchema,
    getAllUsersSchema,
    getUserByIdSchema,
    updateUserSchema,
    deleteUserSchema
} from './schemas/usersSchemas.js';

// Instancia o controller
const usersControllers = new UsersControllers();

export const usersRoutes = async (fastify, options) => {
    // POST /users
    fastify.post('/users', { schema: createUserSchema }, async (request, reply) => {
        return await usersControllers.add(request, reply);
    });

    // GET /users
    fastify.get('/users', { schema: getAllUsersSchema }, async (request, reply) => {
        return await usersControllers.getAll(request, reply);
    });

    // GET /users/:id
    fastify.get('/users/:id', { schema: getUserByIdSchema }, async (request, reply) => {
        return await usersControllers.getById(request, reply);
    });

    // PUT /users/:id
    fastify.put('/users/:id', { schema: updateUserSchema }, async (request, reply) => {
        return await usersControllers.update(request, reply);
    });

    // DELETE /users/:id
    fastify.delete('/users/:id', { schema: deleteUserSchema }, async (request, reply) => {
        return await usersControllers.delete(request, reply);
    });
};