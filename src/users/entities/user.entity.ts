import { IsEmail, IsMongoId, IsNotEmpty} from "class-validator";
import { Role } from "./role";

export class UserEntity {
    @IsMongoId()
    _id? : string
    @IsEmail()
    @IsNotEmpty()
    email : string
    @IsNotEmpty()
    password : string;
    @IsNotEmpty()
    username : string;
    gender  : "male" | "female"
    @IsNotEmpty()
    role  : Role
    //friends : UserEntity[]
    createAt?  : Date
    updateAt?  : Date
}
