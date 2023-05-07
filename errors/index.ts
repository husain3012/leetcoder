import type { NextApiRequest, NextApiResponse } from "next";


abstract class RequestError {

static response(req:NextApiRequest, res:NextApiResponse, error){

    return res.status(error.status || 500).send(error.message || "Something went wrong!");

}

};

export default RequestError