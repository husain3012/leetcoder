import ILeetcodeUser from "./../@types/leetcode_user";

const start = '<script id="__NEXT_DATA__" type="application/json">';
const end = "</script>";

const contestRankingStart = 'Contest Rating</div><div class="text-label-1 dark:text-dark-label-1 flex items-center text-2xl">'
const contestRankingEnd = '</div></div><div class="mr-4"><div class="text-label-3 dark:text-dark-label-3">'
const globalRankingStart = 'Global Ranking</div><div class="text-label-1 dark:text-dark-label-1 font-medium leading-[22px]">'
const globalRankingEnd =  '<span class="text-label-4 dark:text-dark-label-4">/<!-- -->'
const contestAttendedStart = 'Attended</div><div class="text-label-1 dark:text-dark-label-1 font-medium leading-[22px]">'
const contestAttendedEnd = '</div></div></div></div>'
export const parseHTML = (html_string)  : any[]=> {
  try {
    let useFullData = [];
    
    const queries: [] = JSON.parse(html_string.split(start)[1]?.split(end)[0])[
      "props"
    ]["pageProps"]["dehydratedState"]["queries"];
    queries.forEach((q) => {
      if (
        q["state"] &&
        q["state"]["data"] &&
        q["state"]["data"]["matchedUser"]
      ) {
        useFullData.push(q["state"]["data"]["matchedUser"]);
      }
    });
   

    const contestAttended = parseInt(html_string.split(contestAttendedStart)[1]?.split(contestAttendedEnd)[0]?.replace(/,/g, '')) || 0;
    const contestRating = parseInt(html_string.split(contestRankingStart)[1]?.split(contestRankingEnd)[0]?.replace(/,/g, '')) || 0;
    const contestRanking = parseInt(html_string.split(globalRankingStart)[1]?.split(globalRankingEnd)[0]?.replace(/,/g, '')) || 0;

    const contestInfo = {contestAttended, contestRating, contestRanking}
    console.log(contestInfo)

    
    useFullData.push(contestInfo)
    return useFullData;
  } catch (error) {
    return [
      error,
    ];
  }

};

export const leetcodeify_user = (user: any[], exclude: string[] = []) => {
  let transformed_user = {};
  for (let props of user) {
    for (let key of Object.keys(props)) {
      if (!exclude.includes(key)) {
        transformed_user[key] = props[key];
      }
    }
  }

  return transformed_user as ILeetcodeUser;
};
