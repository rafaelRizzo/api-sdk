import { verifiyToken } from '../utils/jwt/index.js'
import { logger } from '../utils/logger/index.js'

export const authTokenMiddleware = async (request, reply) => {
    logger.info("Entrou no middleware.")

    const authorizationHeader = request.headers.authorization

    if (!authorizationHeader) {
        logger.info("Token não informado.")
        return reply.status(401).send({ message: 'Token não informado' })
    }

    const token = authorizationHeader.split(' ')[1]
    if (!token) {
        logger.info("Token Bearer não encontrado.")
        return reply.status(401).send({ message: 'Token Bearer não encontrado' })
    }

    try {
        const decoded = await verifiyToken(token)

        if (!decoded) {
            logger.info("Token inválido.")
            return reply.status(401).send({ message: 'Token inválido.' })
        }

        request.user = decoded
    } catch (error) {
        logger.error("Erro na autenticação:", error)
        return reply.status(401).send({ message: 'Erro na autenticação.' })
    }
}
