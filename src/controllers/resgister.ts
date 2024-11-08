import { Request, Response } from "express";

const Register = async (req: Request, res: any) => {
    try {
        console.log(req.body);
        // const { role, sid, name, email, password, department, session } = req.body;

        // if (!role || !sid || !name || !email || !password || !department || !session) {
        //     return res.status(400).json({
        //         message: "All fields are required"
        //     })
        // }

        // if (role == "Teacher") {
        //     // Check if teacher exists
        //     // If teacher exists, return error
        //     // If teacher does not exist, create teacher
        // } else {
        //     // Check if  exists
        //     // If exists, return error
        //     // If does not exist, create account
        // }


    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}


export default Register;