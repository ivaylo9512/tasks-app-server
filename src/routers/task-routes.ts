import { Router, Response, ErrorRequestHandler } from 'express';
import { TaskRequest } from 'src/types';
import { verifyUser } from '../utils/jwt-strategy';
import UnauthorizedException from '../exceptions/unauthorized';

const router = Router();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status).send(err.message)
}

router.get('/findById/:id', verifyUser, async (req: TaskRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }

    res.send(await req.service?.findById(Number(req.params.id), loggedUser));
}, errorHandler)
router.get('/findByDate/:date', verifyUser, async (req: TaskRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.findByDate(req.params.date, loggedUser));
}, errorHandler)
router.get('/findByState/:state', verifyUser, async (req: TaskRequest, res) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.findByState(req.params.state, loggedUser));
})
router.post('/create', verifyUser, async (req: TaskRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.create(req.body, loggedUser))
}, errorHandler)

router.patch('/update', verifyUser, async (req: TaskRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.update(req.body, loggedUser))
}, errorHandler)

router.delete('/delete/:id', verifyUser, async(req: TaskRequest, res: Response) => {
    const loggedUser = req.user;
    if(!loggedUser){
        throw new UnauthorizedException('Unauthorized');
    }
    
    res.send(await req.service?.delete(Number(req.params.id), loggedUser))
}, errorHandler)

export default router