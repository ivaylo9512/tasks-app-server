import { Router } from 'express';
import { TaskRequest } from 'src/types';

const router = Router();

router.get('/findById/:id', async (req: TaskRequest, res) => {
    return res.send(await req.service?.findById(Number(req.params.id)));
})

router.post('/create', async (req: TaskRequest, res) => {
    return res.send(await req.service?.create(req.body))
})

router.patch('/update', async (req: TaskRequest, res) => {
    return res.send(await req.service?.update(req.body))
})

router.delete('/delete/:id', async(req: TaskRequest, res) => {
    res.send(await req.service?.delete(Number(req.params.id)))
})

export default router