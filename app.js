import express from 'express';
import trabajosRoutes from './src/routes/index.js';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const __dirname = process.cwd();

const app = express();

app.use(cors({
    origin: '*'
}))

//middlewares
app.use(express.json())

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));

app.use(trabajosRoutes)

export default app;