import { AuthControllers } from '../../controllers/auth/authController.js'
import { loginSchema } from './schemas/authSchemas.js'

// Instancia o controller
const authController = new AuthControllers()

export const authRoutes = async (fastify, options) => {
    fastify.post('/login', {
        schema: loginSchema,
        handler: async (request, reply) => {
            await authController.login(request, reply)
        }
    })
}