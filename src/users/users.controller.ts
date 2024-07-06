import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get("/friends/:userId")
  findfriends(@Param("userId") id : string){
    return this.usersService.findFriends(id)
  }

  /*@Put("/status/:id")
  changeStatus(@Param("id") id : string){ 
    return this.usersService.changeStatus(id)
  }*/

  @Patch("/friend/add")
  addFriend(@Body("userId") userId : string ,@Body("friendId") friendId : string){
    return this.usersService.addFriend(userId , friendId)
  }
  @Patch("/friend/remove")
  removeFriend(@Body("userId") userId : string ,@Body("friendId") friendId : string){
    return this.usersService.removeFriend(userId , friendId)
  }
}
