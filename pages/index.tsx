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
    <div className="">
      <div className="p-4">
        <h1 className="text-4xl font-bold">Leetcode API</h1>
        <p>
          REST API to get public profile info from{" "}
          <Link href={"https://leetcode.com/"} target="_blank" rel="noreferrer">
            leetcode.com
          </Link>
        </p>
      </div>

      <div className="divider"></div>
      <div className="flex flex-row flex-wrap gap-2 justify-between p-4">
        <div className="md:w-1/3">
          <form onSubmit={onSubmitHandler}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Leetcode username</span>{" "}
              </label>
              <label className="input-group">
                <input
                  onChange={(e) => setUserName(e.target.value.trim())}
                  type="text"
                  placeholder="Username"
                  className="input input-bordered"
                />
                <button type="submit" className="btn">
                  Fetch!
                </button>
              </label>
            </div>
          </form>

          {
            <div className="card my-4">
              <div className="card-title mb-2">API URL</div>

              <div className="mockup-code ">
                <pre data-prefix=">" className="text-success">
                  <code>GET {apiLink}</code>
                </pre>
              </div>
            </div>
          }
        </div>

        <div className="md:w-3/5">
          <p className="text-2xl font-bold mb-2">
            Response{" "}
            <button
              onClick={() => navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2))}
              className="btn btn-sm btn-success"
            >
              Copy
            </button>
          </p>

          <div className="mockup-code max-h-screen max-w-screen-sm md:max-w-screen-lg overflow-y-auto overflow-x-clip">
            {JSON.stringify(apiResponse, null, 2)
              .split("\n")
              .map((line, idx) => (
                <pre key={idx} data-prefix="$">
                  <code>{line}</code>
                </pre>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
