import {StatusCodes} from "http-status-codes";
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


export const signUp = async (req, res) => {

    try {
        const {firstName, lastName, email, password} = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please Provide Required Information",
            });
        }

        const hash_password = await bcrypt.hash(password, 10);

        const userData = {
            firstName,
            lastName,
            email: email.toLowerCase(),
            hash_password,
        };

        const user = await User.findOne({email});

        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User already registered",
            });
        } else {
            const user = await User.create(userData);
            user.token = jwt.sign(
                {
                    user_id: user.id, email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                });

            return res.status(201).json(user);
        }
    } catch (e) {
        console.log("Error occurred while signing up:", e);
    }
};


export const signIn = async (req, res) => {

    try {
        if (!req.body.email || !req.body.password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });
        }

        const user = await User.findOne({ email: req.body.email });

        if (user) {

            if (await user.authenticate(req.body.password)) {

                user.token = jwt.sign(
                    { user_id: user._id, email: user.email },
                    process.env.JWT_SECRET,{ expiresIn: "1h"});

                return res.status(StatusCodes.OK).json(user);

            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Something went wrong! Please check the password",
                });
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User does not exist. Please sign up if you haven't already.",
            });
        }
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Error connecting to the server"
            });
    }
};

