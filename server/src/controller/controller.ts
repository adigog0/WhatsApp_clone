import { Request, Response, NextFunction } from "express";
import {
  decryptUserInfo,
  getAllUsers,
  getUserChats,
  getUserMessages,
  signInUser,
  signUpUser,
  updateMessageStatusById,
} from "../services/user.service";
import { ISenderData } from "../modals/interfaces";
import { DefaultAPIError } from "../lib/error";
import { APISuccessResponse } from "../lib/success";
import { sendErrorResponse, sendSucccessResponse } from "../utils/response";

type ControllerArgsInput = {
  Query?: Record<string, any>;
  Params?: Record<string, any>;
  Body?: Record<string, any>;
  Resp?: Record<string, any>;
};

type ControllerArgs<T extends ControllerArgsInput> = [
  req: Request<
    T["Params"] extends undefined ? {} : T["Params"],
    T["Resp"] extends undefined ? {} : T["Resp"],
    T["Body"] extends undefined ? {} : T["Body"],
    T["Query"] extends undefined ? {} : T["Query"]
  >,
  res: Response,
  next?: NextFunction
];

export async function googleSignUp(
  ...[req, res]: ControllerArgs<{
    Body: { token: string };
  }>
) {
  try {
    const [result,error] = await decryptUserInfo(req.body.token);
    if (result) {
      // const { name, email, picture } = ticket;
      // const userDetails = await signUpUser(name, email, picture);
      // res.status(201).json(userDetails);
    }
  } catch (err: any) {
    console.log("error in google Signup ", err);
  }
}

// export async function getContactList(...[req,res]:ControllerArgs<{}>){
//   const [result,error] = await getAllUsers<DefaultAPIError>();
//   if(error) return sendErrorResponse(res,new DefaultAPIError(500,`${error.message},${error.stack}`));
//   else return sendSucccessResponse(res,new APISuccessResponse(result.rows ?? []))

// } 


export async function googleSignIn(
  ...[req, res]: ControllerArgs<{
    Body: { token: string };
  }>
) {
  const [result,error] = await decryptUserInfo(req.body.token);
  if(result){
    const { email} = result;
    const [emailExist,error] = await signInUser(email);
    if(error) return sendErrorResponse(res,new DefaultAPIError(500,`${error.message},${error.stack}`));

  else return sendSucccessResponse(res,new APISuccessResponse(emailExist ?? []))

    
  }
}

export async function getUserMessageById(
  ...[req, res]: ControllerArgs<{
    Params: { id: string };
  }>
) {
  const [result, error] = await getUserMessages<DefaultAPIError>(req.user.userId, req.params.id);
  if (error)
    return sendErrorResponse(
      res,
      new DefaultAPIError(500, `${error.message},${error.stack}`)
    );
  else
    return sendSucccessResponse(res, new APISuccessResponse(result));
}

export async function updateStatusByMessageId(
  ...[req, res]: ControllerArgs<{
    Query: { messageId: string };
    Body: { message: ISenderData };
  }>
) {
  const [result, error] = await updateMessageStatusById<DefaultAPIError>(
    req.body.message
  );
  console.log("result for  update Status by message id",result)

  if (error)
    return sendErrorResponse(
      res,
      new DefaultAPIError(500, `${error.message}, ${error.stack}`)
    );
  else
    return sendSucccessResponse(res, new APISuccessResponse(result));
}

export async function getUserAllChats(...[req, res]: ControllerArgs<{}>){
  const [result,error] = await getUserChats<DefaultAPIError>(req.user.userId);

  if(error) return sendErrorResponse(
    res,
    new DefaultAPIError(500, `${error.message}, ${error.stack}`)
  );
  else
  return sendSucccessResponse(res, new APISuccessResponse(result));

}

export async function getContactList(...[req,res]:ControllerArgs<{}>){
  const [result,error] = await getAllUsers<DefaultAPIError>();
  if(error) return sendErrorResponse(res,new DefaultAPIError(500,`${error.message},${error.stack}`));
  else return sendSucccessResponse(res,new APISuccessResponse(result.rows ?? []))

} 
