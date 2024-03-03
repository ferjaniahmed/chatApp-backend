import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type userDocument = HydratedDocument<User>
@Schema({timestamps : true})
export class User{
    @Prop({required : true})
    username : string
    @Prop({required : true})
    email : string 
    @Prop()
    password : string
    @Prop({required  :true})
    role : string 
    @Prop()
    gender  :string
}

export const UserSchema = SchemaFactory.createForClass(User)