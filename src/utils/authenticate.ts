import { ExtractJwt, Strategy} from 'passport-jwt';
import { use, authenticate } from 'passport';
import { Express } from 'express';

export const jwtSecret = process.env.JWT_SECRET!

if(typeof jwtSecret === 'undefined'){
    throw new Error('Jwt secret is missing.')
}

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
export const verifyMiddleware = (app: Express) => 
    app.use('**/auth', (req, res, next) => 
        authenticate(strategy, { session: false  }, (_error, user, info, _status) => {
            if(info){
                return res.status(401).send(info.message);
            }
            
            req.user = user;
            return next();
    }))