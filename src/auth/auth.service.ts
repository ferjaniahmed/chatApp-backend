import { Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/users/entities/user.entity";


@Injectable()
export class AuthService{
    

    constructor(private readonly usersService : UsersService ){}

    async validateUser(username: string, pass: string) {
        const user: any = await this.usersService.findByUsername(username);
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        const {password , ...resualt} = user._doc
        const passwordValid = await bcrypt.compare(pass, user.password)
        if (user && passwordValid) {
            return resualt  
        }
        return null;
    } 


    /*async login(data : any){
        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }*/
}
