import express from 'express';
import trabajosRoutes from './src/routes/index.js';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { sequelize } from './src/database/database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const deploy = process.env.FRONT_DEPLOY;
const local = process.env.LOCALHOST

const allowedOrigins = [`${deploy}`, `${local}`];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));


app.use(express.json());


const uploadDir = path.join('/tmp', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));


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