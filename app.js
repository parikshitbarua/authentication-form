import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import User from "./src/models/User.js";
import dbClient from "./src/configs/db.config.js";
import bodyParser from 'body-parser';
import loginUser from "./src/utils/backend/loginUser.js";
import cors from 'cors';
import appRouter from "./src/routes/auth.js"

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/app', appRouter);


const jsonParser = bodyParser.json();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/src/public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/public/views/landing-page.html'));
})

app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname,'/src/public/views/app.html'));
});


//
// app.post('/register', jsonParser, async (req, res) => {
//
//     let email = req.body.email;
//     let password = req.body.password;
//
//     const user = await User.findOne({ email: email });
//     if (user) {
//
//         console.log("User already exists");
//         return res.status(404).json({message: "Email already taken"});
//
//     } else {
//         console.log(email, password);
//         const newUser = new User({
//             email: email,
//             password: password
//         });
//
//         await newUser.save();
//
//         return res.status(200).json({message: "Successfully signed in"});
//
//
//     }
// });
//
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/public/views/sign-in.html'));
});
//
// app.post('/login', jsonParser, async (req, res) => {
//     let response = loginUser(req);
//     res.send(response);
// })

app.listen(PORT,
    async () => {
        await dbClient();
        console.log(`listening on http://localhost:${PORT}`);
    });