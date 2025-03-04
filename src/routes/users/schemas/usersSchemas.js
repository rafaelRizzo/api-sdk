// Schema para criar um usuário (POST /users)
export const createUserSchema = {
    description: 'Cria um novo usuário no sistema',
    tags: ['Users'],
    summary: 'Adiciona um usuário com nome e email',
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Nome do usuário' },
            email: { type: 'string', format: 'email', description: 'Email do usuário' }
        },
        required: ['name', 'email']
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
            description: 'Erro de validação nos dados enviados',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

// Schema para listar todos os usuários (GET /users)
export const getAllUsersSchema = {
    description: 'Lista todos os usuários cadastrados',
    tags: ['Users'],
    summary: 'Retorna a lista completa de usuários',
    response: {
        200: {
            description: 'Lista de usuários retornada com sucesso',
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    description: 'Mensagem de sucesso'
                },
                data: {
                    type: 'array',
                    description: 'Lista de usuários',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer', description: 'ID do usuário' },
                            name: { type: 'string', description: 'Nome do usuário' },
                            email: { type: 'string', description: 'Email do usuário' }
                        },
                        required: ['id', 'email', 'name']
                    }
                }
            },
            required: ['message', 'data']
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

// Schema para buscar um usuário por ID (GET /users/:id)
export const getUserByIdSchema = {
    description: 'Busca um usuário específico pelo ID',
    tags: ['Users'],
    summary: 'Retorna os detalhes de um usuário pelo seu ID',
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
                    },
                    required: ['id', 'name', 'email']
                }
            },
            required: ['message', 'data']
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

// Schema para atualizar um usuário (PUT /users/:id)
export const updateUserSchema = {
    description: 'Atualiza os dados de um usuário existente',
    tags: ['Users'],
    summary: 'Modifica o nome e/ou email de um usuário pelo ID',
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
                message: { type: 'string', description: 'Mensagem de sucesso' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID do usuário' },
                        name: { type: 'string', description: 'Nome atualizado do usuário' },
                        email: { type: 'string', description: 'Email atualizado do usuário' }
                    },
                    required: ['id', 'name', 'email']
                }
            },
            required: ['message', 'data']
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

// Schema para deletar um usuário (DELETE /users/:id)
export const deleteUserSchema = {
    description: 'Remove um usuário do sistema',
    tags: ['Users'],
    summary: 'Deleta um usuário pelo seu ID',
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
            },
            required: ['message']
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
