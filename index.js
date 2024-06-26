import express from 'express';
import trabajosRoutes from './src/routes/index.js';
import cors from 'cors';
import { sequelize } from './src/database/database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());

app.use(trabajosRoutes);


async function main() {
    try {
        await sequelize.sync({ force: false });

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error("Connection failed:", error.message);
    }
}


main();


export default app;