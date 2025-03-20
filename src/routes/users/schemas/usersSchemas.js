export const createUserSchema = {
    description: 'Cria um novo usuário no sistema',
    tags: ['Users'],
    summary: 'Adiciona um usuário com email e senha',
    headers: {
        type: 'object',
        properties: {
            Authorization: { type: 'string', description: 'Token de autorização' }
        },
        required: ['Authorization']
    },
    body: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email', description: 'Email do usuário' },
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
                id: { type: 'integer', description: 'ID do usuário criado' },
                name: { type: 'string', description: 'Nome do usuário' },
                email: { type: 'string', description: 'Email do usuário' },
                role: { type: 'string', description: 'Permissão do usuário' },
                status: { type: 'string', description: 'Status do usuário' },
                created_at: { type: 'string', description: 'Data da criação do usuário' }
            }
        },
        400: {
            description: 'Erro de validação nos dados enviados',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

export const getAllUsersSchema = {
    description: 'Lista todos os usuários cadastrados',
    tags: ['Users'],
    summary: 'Retorna a lista completa de usuários',
    headers: {
        type: 'object',
        required: ['Authorization']
    },
    response: {
        401: {
            description: 'Token ausente ou inválido',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        500: {
            description: 'Erro interno ao listar usuários',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

export const getUserByIdSchema = {
    description: 'Busca um usuário específico pelo ID',
    tags: ['Users'],
    summary: 'Retorna os detalhes de um usuário pelo seu ID',
    headers: {
        type: 'object',
        required: ['Authorization']
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', description: 'ID do usuário a ser buscado' }
        },
        required: ['id']
    },
    response: {
        200: {
            description: 'Usuário encontrado',
            type: 'object',
            properties: {
                message: { type: 'string', description: 'Mensagem de sucesso' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID do usuário' },
                        name: { type: 'string', description: 'Nome do usuário' },
                        email: { type: 'string', description: 'Email do usuário' }
                    }
                }
            }
        },
        404: {
            description: 'Usuário não encontrado',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        500: {
            description: 'Erro interno ao buscar usuário',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

export const updateUserSchema = {
    description: 'Atualiza os dados de um usuário existente',
    tags: ['Users'],
    summary: 'Modifica o nome e/ou email de um usuário pelo ID',
    headers: {
        type: 'object',
        required: ['Authorization']
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', description: 'ID do usuário a ser atualizado' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Novo nome do usuário (opcional)' },
            email: { type: 'string', format: 'email', description: 'Novo email do usuário (opcional)' }
        }
    },
    response: {
        200: {
            description: 'Usuário atualizado com sucesso',
            type: 'object',
            properties: {
                message: { type: 'string', description: 'Mensagem de sucesso' }
            }
        },
        400: {
            description: 'Erro de validação (ex.: email duplicado)',
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
        },
        500: {
            description: 'Erro interno ao atualizar usuário',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

export const deleteUserSchema = {
    description: 'Remove um usuário do sistema',
    tags: ['Users'],
    summary: 'Deleta um usuário pelo seu ID',
    headers: {
        type: 'object',
        required: ['Authorization']
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', description: 'ID do usuário a ser deletado' }
        },
        required: ['id']
    },
    response: {
        200: {
            description: 'Usuário deletado com sucesso',
            type: 'object',
            properties: {
                message: { type: 'string', description: 'Mensagem de sucesso' }
            }
        },
        404: {
            description: 'Usuário não encontrado',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        500: {
            description: 'Erro interno ao deletar usuário',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};
