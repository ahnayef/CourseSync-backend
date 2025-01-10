import Joi from "joi";
import { connectToDatabase } from "../../utils/db.util";

const schema = Joi.object({
    session: Joi.string().allow(null).pattern(/^(Spring|Summer|Fall) \d{2}$/).optional().messages({ 'string.pattern.base': 'Session must be in format of (Spring|Summer|Fall) YY' }),
    day: Joi.string().valid('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday').required(),
    start: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).required().messages({ 'string.pattern.base': 'Time must be in the format of HH:MM:SS' }),
    end: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).required().messages({ 'string.pattern.base': 'Time must be in the format of HH:MM:SS' }),
    course: Joi.number().required(),
    instructor: Joi.number().required(),
    room: Joi.string().pattern(/^R-\d{3}$/).required().messages({ 'string.pattern.base': 'Room must be in the format of R-XXX' }),
    department: Joi.string().valid("CSE", "BBA", "English", "LLB").required(),
})


const createSchedule = async (req: any, res: any) => {

    try {

        const { user } = req;

        if (user.role !== "hod") {
            return res.status(403).send("You are not authorized to create a schedule");
        }

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.message);
        }

        const db = await connectToDatabase();

        const { session, day, start, end, course, instructor, room } = value;

        const [rows]: any = await db.query("SELECT * FROM schedules WHERE day = ? AND start = ? AND end = ? AND room = ?", [day, start, end, room]);

        if (rows.length) {
            return res.status(409).send("Schedule already exists");
        }

        const result: any = await db.query(
            "INSERT INTO schedules (session, day, start, end, course, instructor, room) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [session, day, start, end, course, instructor, room]
        )

        const [schedule]: any = await db.query("SELECT * FROM schedules WHERE id = ?", [result[0].insertId]);

        if (!schedule.length) {
            return res.status(500).send("Could not create schedule");
        }

        return res.status(201).send("Schedule Created Successfully");


    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }

}


export default createSchedule;