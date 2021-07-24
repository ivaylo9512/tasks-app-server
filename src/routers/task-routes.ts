import { Router, Response } from 'express';
import { TaskRequest } from 'src/types';
import UnauthorizedException from '../exceptions/unauthorized';

const router = Router();

router.get('/auth/findById/:id', async (req: TaskRequest, res: Response, _next) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }

    res.send(await req.service?.findById(Number(req.params.id), loggedUser));
})

router.get('/auth/findByDate/:date', async (req: TaskRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.findByDate(req.params.date, loggedUser));
})

router.get('/auth/findByState/:state', async (req: TaskRequest, res) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.findByState(req.params.state, loggedUser));
})

router.post('/auth/create', async (req: TaskRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.create(req.body, loggedUser))
})

router.patch('/auth/update', async (req: TaskRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.update(req.body, loggedUser))
})

router.delete('/auth/delete/:id', async(req: TaskRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.delete(Number(req.params.id), loggedUser))
})

export default router