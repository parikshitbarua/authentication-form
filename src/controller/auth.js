import {StatusCodes} from "http-status-codes";
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import shortid from 'shortid';


export const signUp = async (req, res) => {
    console.log("Inside Sign up");
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
        email,
        hash_password,
    };

    const user = await User.findOne({email});
    if (user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "User already registered",
        });
    } else {
        User.create(userData).then((data, err) => {
            if (err) res.status(StatusCodes.BAD_REQUEST).json({err});
            else
                res
                    .status(StatusCodes.CREATED)
                    .json({message: "User created Successfully"});
        });
    }
};

export const signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });
        }

        const user = await User.findOne({ email: req.body.email });

        if (user) {
            if (await user.authenticate(req.body.password)) {
                const token = jwt.sign(
                    { _id: user._id, email: user.email },
                    process.env.JWT_SECRET,{ expiresIn: "30d"});

                const { _id, firstName, lastName, email } = user;
                console.log("User authenticated:", email)
                res.status(StatusCodes.OK).json({
                    token,
                    user: { _id, firstName, lastName, email },
                });
            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Something went wrong!",
                });
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "User does not exist..!",
            });
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};

