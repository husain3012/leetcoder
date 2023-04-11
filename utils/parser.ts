const start = '<script id="__NEXT_DATA__" type="application/json">';
const end = "</script>";

export const parseHTML = (html_string) => {
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

    return useFullData;
  } catch (error) {
    return {
      error,
    };
  }
};
