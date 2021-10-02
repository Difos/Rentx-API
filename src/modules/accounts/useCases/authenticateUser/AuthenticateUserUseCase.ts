import {compare} from "bcryptjs";
import { inject, injectable } from "tsyringe";
import {sign} from "jsonwebtoken";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import {AppError} from "@shared/erros/AppError";



interface IRequest {
    email:string;
    password:string;
}

interface IResponse{
    user:{
        name:string,
        email:string
    },
    token:string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository){}

    async execute({email, password}:IRequest):Promise<IResponse>{
        //usuario existe
        const user = await this.usersRepository.findByEmail(email);
        
        if(!user){
            throw new Error("Email or password incorrect!");
        }

        // senha esta correta
        const passwordMatch = await compare(password,user.password);

        if(!passwordMatch){
            throw new AppError("Email or password incorrect!");
        }

        //gerar jwt
        const token = sign({},"68cc20736358ce80d54199b144fc7eb8",{
            subject:user.id,
            expiresIn: "1d"
        });

        
        const tokenReturn: IResponse = {
            token,
            user:{
                name:user.name,
                email:user.email
            },
        }
        return tokenReturn;
    }
}

export {AuthenticateUserUseCase}