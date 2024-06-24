import {Trabajo} from '../models/trabajos.js'
import fs from 'fs';
import path from 'path';

export const getTrabajos = async(req, res) => {
    try {
        const trabajos = await Trabajo.findAll()
        res.json(trabajos)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createTrabajo = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const newTrabajo = await Trabajo.create({
            nombre,
            descripcion,
            imagen
        });

        res.json(newTrabajo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTrabajo = async(req, res) => {

    try {
        const { id } = req.params

        const trabajo = await Trabajo.findByPk(id);
        if (!trabajo) {
            return res.status(404).json({ message: 'Trabajo no encontrado' });
        }

        const imagePath = trabajo.imagen ? path.join(process.cwd(), trabajo.imagen) : null;

        await Trabajo.destroy({
        where: {
            id,
        }
    });

    if (imagePath) {
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Error al eliminar la imagen: ${err.message}`);
            }
        });
    }

    res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
