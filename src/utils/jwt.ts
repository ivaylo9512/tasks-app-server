import { JwtUser } from 'src/types';
import { sign } from 'jsonwebtoken';

const jwtExpiry = eval(process.env.JWT_EXPIRY || '60 * 20');
export const jwtSecret = process.env.JWT_SECRET!

if(typeof jwtSecret === 'undefined'){
    throw new Error('Jwt secret is missing.')
}

export const getToken = (user: JwtUser): string => sign({
    id: user.id,
    role: user.role
}, 
jwtSecret, {
    expiresIn: jwtExpiry,
})