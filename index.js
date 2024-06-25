import express from 'express';
import trabajosRoutes from './src/routes/index.js';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { sequelize } from './src/database/database.js';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary'

dotenv.config();

const app = express();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_PRIVATE
});

const port = process.env.PORT || 3000;

app.use(cors())

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