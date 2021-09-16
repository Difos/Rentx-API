import {NextFunction,Request,Response} from "express";
import {verify} from "jsonwebtoken";
import { AppError } from "../../../erros/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";


interface IPaylod {
    user_id:string
}

export async function ensureAuthenticated(request: Request, response:Response,next: NextFunction){

    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing",401);
    }

    const  [,token] = authHeader.split(" ");

    try {
        
        const {user_id} = verify(token,"68cc20736358ce80d54199b144fc7eb8") as IPaylod;
        console.log(user_id);

        const userRepository = new UsersRepository();

        const authHeader = userRepository.findById(user_id)

        if(!authHeader){
            throw new AppError("user does not exists",401);
        }

        request.user = {
            id: user_id
        }

        next();
    } catch {
        throw new AppError("invalid token error",401);
    }
}