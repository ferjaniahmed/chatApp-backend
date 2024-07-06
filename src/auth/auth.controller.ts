import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "src/guards/auth.guard";
import { AuthenticatedGuard } from "src/guards/authenticate.guard";
import { UsersService } from "src/users/users.service";


@Controller("auth")
export class AuthController{
    constructor(private readonly authService : AuthService , private userService : UsersService){}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async Login(@Request() req){
        await this.userService.changeStatus(req.user._id, req.user.isOnLine)
        return {
            username: req.user.username,
            id: req.user._id,
            msg: 'User logged in'
        };
    }
    

    @UseGuards(AuthenticatedGuard)
    @Get("profile")
    profile(@Request() req){
        return {
            User: req.user
        };
    }

    @Get('/logout')
    async logout(@Request() req){
        await this.userService.changeStatus(req.user._id, req.user.isOnLine)
        req.session.destroy()
        return { 
            msg: 'user logout' 
        }
    }
 

}