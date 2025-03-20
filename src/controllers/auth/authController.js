import { AuthModels } from '../../models/auth/authModels.js'
import { generateToken, verifiyToken } from '../../utils/jwt/index.js'
import { logger } from '../../utils/logger/index.js'
import { cache } from '../../utils/cache/index.js'

const authModel = new AuthModels();

export class AuthControllers {

    async login(request, reply) {
        try {
            const authData = await authModel.login(request.body)

            // Verifica se o usuário está ativo, bloqueado ou desativado
            this.verifyStatus(authData.status, reply)

            // Verifica se já existe um token válido em cache
            let token = cache.get(`user:${authData.id}:token`)

            if (!token) {
                // Se não houver token no cache, usamos o do banco ou geramos um novo
                token = authData.token ?? await generateToken(authData)
                const isValidToken = await verifiyToken(token)

                if (!isValidToken) {
                    token = await generateToken(authData);
                    await authModel.updateToken({
                        email: authData.email,
                        token: token
                    })
                }

                // Salva o token em cache
                cache.set(`user:${authData.id}:token`, token)
            }

            logger.info(`Usuário autenticado com sucesso: ${authData.email}`)

            return reply.code(200).send({
                message: 'Usuário autenticado com sucesso',
                token: token
            })
        } catch (error) {
            logger.error("Erro ao efetuar login", error)

            if (error.message === 'Usuário não encontrado') {
                return reply.code(404).send({ message: error.message })
            } else if (error.message === 'Senha inválida') {
                return reply.code(400).send({ message: error.message })
            }

            return reply.code(500).send({ message: 'Erro interno ao efetuar login' })
        }
    }

    // Funções auuxiliares
    verifyStatus = async (status, reply) => {
        switch (status) {
            case 'ACTIVE':
                return true;
            case 'BLOOCKED':
                return reply.status(402).send({ message: 'Usuário bloqueado' })
            case 'DISABLED':
                return reply.status(401).send({ message: 'Usuário desativado' })
            default:
                return reply.status(500).send({ message: 'Status inválido' })
        }
    }
}