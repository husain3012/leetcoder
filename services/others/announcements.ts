import dayjs from "dayjs";
import {initializeDB} from "../../db";
import SITE_CONFIG from "../../site_config";
const db = initializeDB();

const {notificationHistoryAge} = SITE_CONFIG


export const getAnnouncements =async () => {

    const announcements = await db.announcement.findMany({
        where:{
            createdOn: {
                gt: dayjs().subtract(notificationHistoryAge.amount, notificationHistoryAge.unit).toDate()
            }
        },
        orderBy:{
            createdOn: 'desc',
        }
        
    })

    return announcements.map(a=>({...a, id:a.id.toString()}));
    
}