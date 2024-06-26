import {Router} from 'express'
import multer from 'multer'
import {getTrabajos, createTrabajo, deleteTrabajo} from '../controllers/trabajosControllers.js'

const router = Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/trabajos', getTrabajos)

router.post('/trabajos', upload.single('imagen'), createTrabajo)

router.delete('/trabajos/:id', deleteTrabajo)

export default router