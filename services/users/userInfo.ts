import {initializeDB} from "../../db";


const db = initializeDB();

export const getUserInfo = async (leetcodeUsername:string) => {
    const groups = await db.user.findUnique({
        where: {
         leetcodeUsername
        },
        include:{
          groups:{
              select:{
                  coverPhoto:true,
                  description:true,
                  id:true,
                  urlSlug:true,
                  name:true,
                  _count:true,
  
              }
          },
          leetcodeStats: true
        },
        
       
      });
      

      return groups
}