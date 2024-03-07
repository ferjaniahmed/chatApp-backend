import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/users/entities/user.schema";


export type MessageDocument = Document & Message



@Schema({timestamps : true})
export class Message{
    _id : mongoose.Schema.Types.ObjectId
    @Prop({type : mongoose.Schema.Types.ObjectId , ref : "User"})
    sender : User
    @Prop({type : mongoose.Schema.Types.ObjectId , ref : "User"})
    receiver : User
    @Prop({required : true})
    data : string

}

export const MessageSchema = SchemaFactory.createForClass(Message)