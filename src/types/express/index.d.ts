import { User } from "@prisma/client"
import { JWTPayload } from "../../types";

declare global {
    namespace Express {
        export interface Request {
            token?: JWTPayload,
            user?: User,
        }
    }
}