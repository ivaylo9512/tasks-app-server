import { ExtractJwt, Strategy} from 'passport-jwt'
import { use, authenticate } from 'passport'

export const jwtSecret = process.env.JWT_SECRET || 'undefined'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}
const strategy = new Strategy(opts, (payload, done) => {
    return done(null, {
        id: payload.id,
        role: payload.role
    });
})
use(strategy);
export const verifyUser = authenticate(strategy, { session: false })
