import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Trabajo = sequelize.define(
    "Trabajo", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        descripcion: {
            type: DataTypes.STRING
        },
        imagen: {
            type: DataTypes.STRING
        },
},{
    timestamps: false
})