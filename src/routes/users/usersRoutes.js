import { authTokenMiddleware } from '../../middlewares/authToken.js'
import { UsersControllers } from '../../controllers/users/usersController.js'
import {
    createUserSchema,
    getAllUsersSchema,
    getUserByIdSchema,
    updateUserSchema,
    deleteUserSchema
} from './schemas/usersSchemas.js'

// Instancia o controller
const usersController = new UsersControllers()

export const usersRoutes = async (fastify, options) => {
    fastify.post('/users', {
        preHandler: authTokenMiddleware,
        schema: createUserSchema,
        handler: async (request, reply) => {
            await usersController.add(request, reply)
        }
    });

    fastify.get('/users', {
        preHandler: authTokenMiddleware,
        schema: getAllUsersSchema,
        handler: async (request, reply) => {
            await usersController.getAll(request, reply)
        }
    });

    fastify.get('/users/:id', {
        preHandler: authTokenMiddleware,
        schema: getUserByIdSchema,
        handler: async (request, reply) => {
            await usersController.getById(request, reply)
        }
    });

    fastify.put('/users/:id', {
        preHandler: authTokenMiddleware,
        schema: updateUserSchema,
        handler: async (request, reply) => {
            await usersController.update(request, reply)
        }
    });

    fastify.delete('/users/:id', {
        preHandler: authTokenMiddleware,
        schema: deleteUserSchema,
        handler: async (request, reply) => {
            await usersController.delete(request, reply)
        }
    });
};
