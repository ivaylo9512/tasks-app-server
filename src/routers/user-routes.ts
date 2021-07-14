import { Router } from 'express';
import { UserRequest } from '../types';
import { verifyUser } from '../utils/jwt-strategy';
import UnauthorizedException  from '../exceptions/unauthorized';

const router = Router();

router.get('/findById/:id', async (req: UserRequest, res) => {
    res.send(await req.service?.findById(Number(req.params.id)))
})
router.post('/create', verifyUser, async (req: UserRequest, res) => {
    if(!req.user){
        throw new UnauthorizedException('Unauthorized');
    }
    
    req.body.id = req.user.id;
    res.send(await req.service?.create(req.body));
})
router.delete('/delete/:id', verifyUser, async (req: UserRequest, res) => {
    if(!req.user){
        throw new UnauthorizedException('Unauthorized');
    }
    res.send(await req.service?.delete(Number(req.params.id), req.user));
})
router.patch('/update', verifyUser, async (req: UserRequest, res) => {
    if(!req.user){
        throw new UnauthorizedException('Unauthorized');
    }
    res.send(await req.service?.update(req.body, req.user));
})
export default router
