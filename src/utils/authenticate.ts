import { User } from 'src/entities/user'
import { sign } from 'jsonwebtoken';
import { authenticate } from 'passport';

const jwtSecret = process.env.JWT_SECRET || 'undefined'
const jwtExpiry = eval(process.env.SESSION_EXPIRY || '60 * 20')
export const getToken = (user: User) => {
    return sign(user, jwtSecret, {
      expiresIn: jwtExpiry,
    })
}
export const verifyUser = authenticate("jwt", { session: false })


