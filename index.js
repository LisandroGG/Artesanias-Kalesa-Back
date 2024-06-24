import app from './app.js';
import { sequelize } from './src/database/database.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

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