import winston from 'winston'

// Configuração do transporte de log (pode ser console e/ou arquivo)
export const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
            level: 'info',
        }),
        new winston.transports.File({
            filename: 'logs/application.log',
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`
                })
            ),
        })
    ]
})

export const logRequest = (request, reply, done) => {
    const remoteAddress = request.ip || 'desconhecido'
    const logData = {
        method: request.method,
        url: request.url,
        remoteAddress,
        headers: request.headers,
        params: request.params,
        query: request.query,
        body: request.body // Em preValidation, o body já foi parseado
    }

    // Usando winston para logar a requisição
    logger.info(`Requisição recebida: ${JSON.stringify(logData, null, 2)}`,)

}
