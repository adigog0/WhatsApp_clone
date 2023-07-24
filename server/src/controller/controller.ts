import { Request, Response } from "express";
import { getUserMessages } from "../services/user.service";

type ControllerArgs = [req: Request, res: Response];

export async function getUserMessageById(...[req, res]: ControllerArgs) {
    try {
        const userMessage = await getUserMessages(
            req.user.userId,
            req.params.id
        );
        return res.status(200).json({
            data:userMessage.rows,
            err:null
        });
    } catch (err: any) {
        return { data: null, error: err };
    }
}
