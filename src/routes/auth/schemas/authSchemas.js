export const loginSchema = {
    description: 'Cria um novo usuário no sistema',
    tags: ['Users'],
    summary: 'Adiciona um usuário com nome e email',
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
            description: 'Usuário criado com sucesso',
            type: 'object',
            properties: {
                message: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID do usuário criado' },
                        name: { type: 'string', description: 'Nome do usuário' },
                        email: { type: 'string', description: 'Email do usuário' }
                    }
                }
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
};
