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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", `${deploy}`);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Permissions-Policy", "ch-ua-form-factor");
    next();
  });


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