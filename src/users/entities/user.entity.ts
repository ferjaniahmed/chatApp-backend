import { IsEmail, IsMongoId, IsNotEmpty} from "class-validator";
import { Role } from "./role";
import { Exclude } from "class-transformer";

export class UserEntity {
    @IsMongoId()
    _id? : string
    @IsEmail()
    @IsNotEmpty()
    email : string
    @Exclude()
    password  : string;
    @IsNotEmpty()
    username : string;
    gender  : "male" | "female"
    @IsNotEmpty()
    role  : Role
    friends : UserEntity[]
    isOnLine : boolean
    SocketId : string

    createAt?  : Date
    updateAt?  : Date


    constructor(partial : Partial<UserEntity>){
        Object.assign(this , partial)
    }
}
