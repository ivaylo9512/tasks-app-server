import { Router, ErrorRequestHandler, Response } from 'express';
import { UserRequest } from '../types';
import { verifyUser } from '../utils/jwt-strategy';
import UnauthorizedException  from '../exceptions/unauthorized';

const router = Router();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status).send(err.message)
}

router.get('/findById/:id', async (req: UserRequest, res) => {
    res.send(await req.service?.findById(Number(req.params.id)))
})

router.post('/create', verifyUser, async (req: UserRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    req.body.id = loggedUser.id;
    res.send(await req.service?.create(req.body));
}, errorHandler)

router.delete('/delete/:id', verifyUser, async (req: UserRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.delete(Number(req.params.id), loggedUser));
}, errorHandler)

router.patch('/update', verifyUser, async (req: UserRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.update(req.body, loggedUser));
}, errorHandler)

export default router
