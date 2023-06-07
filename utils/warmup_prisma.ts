import axios from "axios"

export const warmup_prisma = async () =>{
    try {
        const warmup_db = await axios.post("/api/others/warmup_prisma");
        console.log(warmup_db.data?.message)
        return warmup_db.data
        
    } catch (error) {
        console.log(error)
        
        return error
    }
}