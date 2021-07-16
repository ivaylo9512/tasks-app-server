import { Router } from 'express';
import { TaskRequest } from 'src/types';
import { verifyUser } from '../utils/jwt-strategy';
import UnauthorizedException from '../exceptions/unauthorized';

const router = Router();

router.get('/findById/:id', verifyUser, async (req: TaskRequest, res) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }

    res.send(await req.service?.findById(Number(req.params.id), loggedUser));
})
router.get('/findByDate/:date', verifyUser, async (req: TaskRequest, res) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.findByDate(req.params.date, loggedUser));
})
router.get('/findByState/:state', verifyUser, async (req: TaskRequest, res) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.findByState(req.params.state, loggedUser));
})
router.post('/create', verifyUser, async (req: TaskRequest, res) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.create(req.body, loggedUser))
})

router.patch('/update', verifyUser, async (req: TaskRequest, res) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.update(req.body, loggedUser))
})

router.delete('/delete/:id', verifyUser, async(req: TaskRequest, res) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.delete(Number(req.params.id), loggedUser))
})

export default router