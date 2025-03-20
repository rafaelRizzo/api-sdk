import jwt from 'jsonwebtoken';
import { logger } from '../logger/index.js';

export const verifiyToken = async (token) => {
    logger.info('Verificando token...');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        logger.info("Token válido.")
        return true;
    } catch (error) {
        logger.error('Token inválido.', error);
        return null;
    }
}

export const generateToken = async (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}