import { AuthModels } from '../../models/auth/authModels.js';
import { generateToken, verifiyToken } from '../../utils/jwt/index.js';

const AuthModels = new AuthModels();

export class AuthControllers {

    async login(request, reply) {
        try {
            const authData = await AuthModels.login(request.body);

            const isValidToken = await verifiyToken(authData.token);

            if (!isValidToken) {
                return reply.code(400).send({ message: 'Token inválido' });
            }

            const dataUserAuth = await generateToken(authData);

            return reply.code(200).send({
                message: 'Usuário autenticado com sucesso',
                token: dataUserAuth
            });
        } catch (error) {
            if (error.message === 'Usuário não encontrado') {
                return reply.code(400).send({ message: error.message });
            } else if (error.message === 'Senha inválida') {
                return reply.code(400).send({ message: error.message });
            }

            return reply.code(500).send({ message: 'Erro interno ao efetuar login' });
        }
    }

}