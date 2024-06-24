import {Router} from 'express'
import multer from 'multer'
import path from 'path'
import {getTrabajos, createTrabajo, deleteTrabajo} from '../controllers/trabajosControllers.js'

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/trabajos', getTrabajos)

router.post('/trabajos', upload.single('imagen'), createTrabajo)

router.delete('/trabajos/:id', deleteTrabajo)

export default router