import Joi from "joi";
import { connectToDatabase } from "../../utils/db.util";


const schema = Joi.object({
    id: Joi.number().required(),
    session: Joi.string().allow(null).pattern(/^(Spring|Summer|Fall) \d{2}$/).optional().messages({ 'string.pattern.base': 'Session must be in format of (Spring|Summer|Fall) YY' }),
    day: Joi.string().valid('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday').required(),
    start: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).required().messages({ 'string.pattern.base': 'Time must be in the format of HH:MM:SS' }),
    end: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).required().messages({ 'string.pattern.base': 'Time must be in the format of HH:MM:SS' }),
    course: Joi.number().required(),
    room: Joi.string().pattern(/^R-\d{3}$/).required().messages({ 'string.pattern.base': 'Room must be in the format of R-XXX' }),
    department: Joi.string().valid("CSE", "BBA", "English", "LLB").required(),
})

const updateScheule = async (req: any, res: any) => {
    try {
        const { user } = req;

        if (user.role !== "hod") {
            return res.status(403).send("You are not authorized to update a schedule");
        }

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.message);
        }

        const db = await connectToDatabase();

        const { id, session, day, start, end, course, room } = value;

        const [rows]: any = await db.query("SELECT * FROM schedules WHERE id = ?", [id]);

        if (!rows.length) {
            return res.status(404).send("Schedule not found");
        }

        const [overlapping]: any = await db.query("SELECT * FROM schedules WHERE day = ? AND room = ? AND ((TIME(?) BETWEEN TIME(start) AND TIME(end)) OR (TIME(?) BETWEEN TIME(start) AND TIME(end)))", [day, room, start, end]);

        if (overlapping.length) {
            return res.status(409).send("Schedule is overlapping with another schedule");
        }

        const result: any = await db.query(
            "UPDATE schedules SET session = ?, day = ?, start = ?, end = ?, course = ?, room = ? WHERE id = ?",
            [session, day, start, end, course, room, id]
        )

        if (result[0].affectedRows === 0) {
            return res.status(500).send("Could not update schedule");
        }

        return res.status(200).send("Schedule Updated Successfully")



    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export default updateScheule;