import {Trabajo} from '../models/trabajos.js'
import fs from 'fs';
import path from 'path';
import cloudinary from '../utils/cloudinary.js';

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
    const imagen = req.file;

    try {
        let uploadResult = null;
        if (imagen) {
            uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'trabajos' },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result);
                    }
                );
                stream.end(imagen.buffer);
            });
        }

        const newTrabajo = await Trabajo.create({
            nombre,
            descripcion,
            imagen: uploadResult ? uploadResult.secure_url : null,
        });

        res.json(newTrabajo);
    } catch (error) {
        console.error('Error al crear trabajo:', error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTrabajo = async (req, res) => {
    try {
        const { id } = req.params;

        const trabajo = await Trabajo.findByPk(id);
        if (!trabajo) {
            return res.status(404).json({ message: 'Trabajo no encontrado' });
        }

        if (trabajo.imagen) {
            const imagePublicId = trabajo.imagen.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`trabajos/${imagePublicId}`);
        }

        await Trabajo.destroy({
            where: {
                id,
            }
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
