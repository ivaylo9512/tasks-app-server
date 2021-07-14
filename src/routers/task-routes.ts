import { Router } from 'express';
import { TaskRequest } from 'src/types';
import { verifyUser } from '../utils/jwt-strategy';
import UnauthorizedException from 'src/exceptions/unauthorized';

const router = Router();

router.get('/findById/:id', async (req: TaskRequest, res) => {
    return res.send(await req.service?.findById(Number(req.params.id)));
})
router.get('/findByDate', async (req: TaskRequest, res) => {
    return res.send(await req.service?.findByDate(req.body));
})
router.get('/findByState/:state', async (req: TaskRequest, res) => {
    return res.send(await req.service?.findByState(req.params.state));
})
router.post('/create', async (req: TaskRequest, res) => {
    return res.send(await req.service?.create(req.body))
})

router.patch('/update', verifyUser, async (req: TaskRequest, res) => {
    if(!req.user){
        throw new UnauthorizedException('Unauthorized');
    }
    return res.send(await req.service?.update(req.body, req.user))
})

router.delete('/delete/:id', verifyUser, async(req: TaskRequest, res) => {
    if(!req.user){
        throw new UnauthorizedException('Unauthorized');
    }
    res.send(await req.service?.delete(Number(req.params.id), req.user))
})

export default router