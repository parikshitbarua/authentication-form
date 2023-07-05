import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dbClient from "./src/configs/db.config.js";
import cors from 'cors';
import appRouter from "./src/routes/auth.js"

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/app', appRouter);




const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/src/public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/public/views/landing-page.html'));
})

app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname,'/src/public/views/app.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/public/views/sign-in.html'));
});

app.listen(PORT,
    async () => {
        await dbClient();
        console.log(`listening on http://localhost:${PORT}`);
    });