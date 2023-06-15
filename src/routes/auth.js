import { signUp, signIn } from "../controller/auth.js";
import express from "express";
import { isRequestValidated, validateSignInRequest, validateSignUpRequest } from "../validator/auth.js";
import path from "path";
import {__dirname} from "../../app.js";

const appRouter = express.Router();

appRouter.route("/signin").post(validateSignInRequest, isRequestValidated, signIn);


appRouter.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);

appRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/public/views/sign-in.html'));
});

appRouter.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,'/src/public/views/sign-up.html'))
})

export default appRouter;


