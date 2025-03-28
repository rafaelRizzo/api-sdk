export const loginSchema = {
    description: 'Autenticação do usuário',
    tags: ['Auth'],
    summary: 'Autenticação do usuário, passando o email e senha, retornando um token',
    body: {
        type: 'object',
        properties: {
            email: { type: 'string', description: 'Email do usuário' },
            password: { type: 'string', description: 'Senha do usuário' }
        },
        required: ['email', 'password']
    },
    response: {
        200: {
            description: 'Usuário autenticado com sucesso',
            type: 'object',
            properties: {
                message: { type: 'string' },
                token: { type: 'string', description: 'Token do usuário' }
            }
        },
        400: {
            description: 'Usuário ou senha incorretos',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        404: {
            description: 'Usuário não encontrado',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
}
