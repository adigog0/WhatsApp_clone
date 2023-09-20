import {Response} from 'express';
import { APISuccessResponse } from '../lib/success';
import { DefaultAPIError } from '../lib/error';
import {pick} from '../utils/object';
 
export function sendErrorResponse(res: Response, error: DefaultAPIError) {
    res.status(error.statusCode).json(pick(error,['message','status']));
}

export function sendSucccessResponse(res: Response, apiResp: APISuccessResponse) {
     typeof apiResp.response === 'string' ? res.status(apiResp.statusCode).send(apiResp.response) : res.status(apiResp.statusCode).json(apiResp.response);
}