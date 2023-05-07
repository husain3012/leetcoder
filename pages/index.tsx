// import useSWR from "swr";
import { useState } from "react";
import Link from "next/link";
export default function Index() {
  const [userName, setUserName] = useState("");
  const [apiLink, setApiLink] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setApiLink(`${window.origin}/api/leetcode/${userName}`);

    const resp = await fetch(`/api/leetcode/${userName}`);
    setApiResponse(await resp.json());
  };

  return (
   <div>
    
   </div>
  );
}
