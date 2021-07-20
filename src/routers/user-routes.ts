import { Router, Response } from 'express';
import { UserRequest } from '../types';
import UnauthorizedException  from '../exceptions/unauthorized';

const router = Router();

router.get('/findById/:id', async (req: UserRequest, res) => {
    res.send(await req.service?.findById(Number(req.params.id)))
})

router.post('/auth/create', async (req: UserRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    req.body.id = loggedUser.id;
    res.send(await req.service?.create(req.body));
})

router.delete('/auth/delete/:id', async (req: UserRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.delete(Number(req.params.id), loggedUser));
})

router.patch('/auth/update', async (req: UserRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.update(req.body, loggedUser));
})

export default router
