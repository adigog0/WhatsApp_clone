import { Request, Response, NextFunction } from "express";
import { decryptUserInfo, getUserId } from "../services/user.service";

interface IUser {
    userId: number;
    user_email: string;
}

// module augmentation
declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

export async function Auth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const userInfo = await decryptUserInfo(token);
        if (userInfo === null) {
            res.status(401).json({ message: "Unauthorized Access" });
        }
        else {
            const id = await getUserId(userInfo?.email);
            const userId = id.id;
            const user_email = userInfo?.email;

            const userObj = { userId, user_email };
            req.user = userObj;
        }

        next();
    } catch (err: any) {
        console.log("err in Auth", err);
        res.status(500).json({ message: "Something went wrong" });
    }
}
