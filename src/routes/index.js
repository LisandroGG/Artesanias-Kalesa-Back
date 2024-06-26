import {Router} from 'express'
import upload from '../utils/multer.js'
import {getTrabajos, createTrabajo, deleteTrabajo} from '../controllers/trabajosControllers.js'

const router = Router()

router.get('/trabajos', getTrabajos)

router.post('/trabajos', upload.single('imagen'), createTrabajo)

router.delete('/trabajos/:id', deleteTrabajo)

export default router