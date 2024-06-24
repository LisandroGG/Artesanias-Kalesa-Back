import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from "pg"

dotenv.config();

const { DB_URL } = process.env;
console.log(DB_URL)

export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

export default sequelize;