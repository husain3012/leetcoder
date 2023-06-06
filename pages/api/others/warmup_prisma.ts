import { NextApiHandler } from "next";
import { initializeDB } from "../../../db";

const handler : NextApiHandler =  async (req, res) => {
    const db = initializeDB()
    try {
        await db.$connect();
        return res.send( {
            error: false,
            message:"Connected to database",
            data: null,
        })
        
    } catch (error) {
        return res.send( {
            error: true,
            message: error.message || "Something went wrong, try again later!",
            data: error,
        })
        
    }

    
}
export default handler;