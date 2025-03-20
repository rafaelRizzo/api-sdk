// Importação dos módulos necessários
import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify' // Framework principal para criar o servidor
import helmet from '@fastify/helmet' // Middleware para segurança de cabeçalhos HTTP
import cors from '@fastify/cors' // Middleware para configuração de Cross-Origin Resource Sharing
import swagger from '@fastify/swagger' // Geração de documentação OpenAPI
import swaggerUI from '@fastify/swagger-ui' // Interface gráfica para a documentação Swagger

import { usersRoutes } from './src/routes/users/usersRoutes.js' // Rotas específicas dos usuários
import { authRoutes } from './src/routes/auth/authRoutes.js' // Rotas específicas dos usuários
import { logRequest } from './src/utils/logger/index.js' // Função utilitária para log de requisições

// Inicialização do servidor Fastify 
const fastify = Fastify({
    logger: true // Habilita o logger interno do Fastify para monitoramento e depuração
});

// Registro do Helmet para segurança dos cabeçalhos HTTP
await fastify.register(helmet, {
    // Configuração do Content Security Policy (CSP) para prevenir ataques como XSS
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], // Permite apenas recursos do mesmo domínio por padrão
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:']
            // Outras diretivas podem ser adicionadas conforme necessário...
        }
    }
});

// Remove todos os parsers padrões
fastify.removeAllContentTypeParsers()

// Adiciona somente parser para application/json
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    try {
        const json = JSON.parse(body)
        done(null, json)
    } catch (err) {
        done(err)
    }
})

// Registro do CORS para controle de acesso entre domínios
await fastify.register(cors, {
    origin: true, // Permite requisições de qualquer origem (útil em dev, restrinja em produção)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos que o cliente pode enviar
    exposedHeaders: ['X-Custom-Header'], // Cabeçalhos personalizados visíveis ao cliente
    credentials: true, // Permite envio de cookies e credenciais nas requisições
    maxAge: 86400, // Tempo (em segundos, 24h) de cache para requisições preflight
    preflightContinue: false // Fastify gerencia automaticamente requisições OPTIONS
});

// Registro do Swagger para geração da documentação da API
await fastify.register(swagger, {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'Título para a documentação no Swagger WEB',
            description: 'Breve descrição da API',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    }
});

// Hook para log de requisições antes da validação
fastify.addHook('preValidation', (request, reply, done) => {
    // Executa a função de log para registrar detalhes da requisição
    logRequest(request);
    done(); // Indica que o hook terminou e a requisição pode prosseguir
});

// Registro da interface gráfica do Swagger
await fastify.register(swaggerUI, {
    routePrefix: '/docs' // URL onde a documentação estará disponível (ex.: http://localhost:3000/docs)
});

// Registro das rotas da aplicação
await fastify.register(authRoutes); // Carrega as rotas definidas no módulo usersRoutes
await fastify.register(usersRoutes); // Carrega as rotas definidas no módulo usersRoutes

// Inicialização do servidor
fastify.listen({ port: 3000, host: 'localhost' }, (err, address) => {
    if (err) {
        // Em caso de erro, registra no log e encerra o processo
        fastify.log.error(`Erro ao iniciar o servidor: ${err.message}`);
        process.exit(1);
    }
    // Informa que o servidor está ativo e disponível
    fastify.log.info(`Servidor rodando em ${address}`);
});