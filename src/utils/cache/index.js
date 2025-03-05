import NodeCache from 'node-cache'

export const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 })

export const checkToken = (userId, token) => {
    const cachedToken = cache.get(`user:${userId}:token`)
    return cachedToken === token // Retorna true ou false
}
