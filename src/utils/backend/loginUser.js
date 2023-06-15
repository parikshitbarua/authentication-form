import User from "../../models/User.js";

const loginUser = async (req) => {
    let responseMessage;
    let email = req.body.email;
    let password = req.body.password;

    const user = await User.findOne({email: email});

    if (user) {
        if (user.password === password) {
            console.log("Welcome", user.email);
            responseMessage = {
                "message": "welcome",
                "user": user.email
            };
        } else {
            console.log("Incorrect Password");
            responseMessage = {
                "message": "Incorrect Password",
                "user": user.email
            };
        }
    } else {
        console.log("Not found");
        responseMessage = {
            "message": "User not found",
            "user": user.email
        };
    }
};

export default loginUser;