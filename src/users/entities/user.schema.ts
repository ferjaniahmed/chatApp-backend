import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type userDocument = User & Document
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
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  , default : []})
    friends : User[]
    @Prop({default : false})
    isOnLine : boolean
    @Prop()
    socketId :string
    _id: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User)