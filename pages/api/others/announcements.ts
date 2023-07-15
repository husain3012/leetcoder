import { NextApiHandler } from "next";

import { getAnnouncements } from "../../../services/others/announcements";
const handler : NextApiHandler =  async (req, res) => {

    try {
        const announcements = await getAnnouncements()
        return res.send( {
            error: false,
            message:"Fetched Announcements",
            data: announcements,
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