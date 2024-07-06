import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.schema';
import * as bcrypt from 'bcrypt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class UsersService {

  constructor(@InjectModel("User") private readonly userDocument : Model<User>){}
  async create(createUserDto: CreateUserDto) {
    
    try{
      const { password , ...user } = createUserDto
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const newUser = await new this.userDocument({ ...user  , password : hash})
      return await newUser.save()
    }catch(error){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'check your informations',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async findAll() {
    try{
      return await this.userDocument.find().select(["-password"])
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'there is no users yet !!!',
        
      }, HttpStatus.NOT_FOUND, {
        cause: error
      })
    }
  }

  async findOne(id: string) {
    try{
      return await this.userDocument.findById(id).select(["-password"])
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'user not found !!!',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      })
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try{
      return await this.userDocument.updateOne({_id : id} , updateUserDto)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'there is no user for update !!!',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async remove(id: string) {
    try{
      return await this.userDocument.findByIdAndDelete(id).select("-password")
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'there is no user for delete !!!',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      })
    }
  }
  async findByUsername(username: string) {
    try{
      return await this.userDocument.findOne({username : username })
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'there is no user !!!',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      })
    }
  }

  async findFriends(id :string){
    try{
      return await this.userDocument.findById(id).select(["friends"]).populate("friends")
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: error.message,
      }, HttpStatus.NOT_FOUND, {
        cause: error
      })
    }
  }

  async changeStatus(id : string , currentStatus ? : boolean ){
    try{
      if(currentStatus){
        return await this.userDocument.findByIdAndUpdate(id , {isOnLine : ! currentStatus })
      }else{
        const currentUser = await this.findOne(id)
        if(currentUser){
          return await this.userDocument.findByIdAndUpdate(id , {isOnLine : ! currentUser.isOnLine })
        }
      }
    }catch(error){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'there is no user for update !!!',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async updadeSocket(id : string , newSocket : string){
    try{
      return await this.userDocument.updateOne({_id :id} ,
        {$set:
          {
            socketId : newSocket
          }
        })
    }catch(error){
      throw new WsException(error)
    }
    
  }

  async addFriend(userId : string , friendId : string){
    try{
      return await this.userDocument.updateOne({_id : userId} , 
        {$push:
          {
            friends : friendId
          }
        })
    }catch(error){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "can't add friend",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async removeFriend(userId : string , friendId: string){
    try{
      return await this.userDocument.updateOne({_id : userId} , 
        {$pull:
          {
            friends:friendId 
          }
        })
    }catch(error){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "can't remove friend",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

}
