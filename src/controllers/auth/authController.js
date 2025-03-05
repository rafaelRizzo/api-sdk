import { AuthModels } from '../../models/auth/usersModels.js';

const AuthModels = new AuthModels();

export class AuthControllers {

    async login(request, reply) {
        try {
            const authData = await AuthModels.login(request.body);

            return reply.code(200).send({
                message: 'Usuário autenticado com sucesso',
                data: authData
            });
        } catch (error) {
            if (error.message === 'Usuário não encontrado') {
                return reply.code(400).send({ message: error.message });
            } else if (error.message === 'Login ou senha incorretos') {
                return reply.code(400).send({ message: error.message });
            }

            return reply.code(500).send({ message: 'Erro interno ao efetuar login' });
        }
    }

}