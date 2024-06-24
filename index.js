import app from './app.js';
import {sequelize} from './src/database/database.js'
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST } = process.env;

const port = DB_HOST || 3000;

async function main(){
    try {
        await sequelize.sync({ force: false })
        app.listen(port);
        console.log(`server is listening on port ${port}`);
    } catch (error) {
        console.error("conexion fallida")
    }
};

main();