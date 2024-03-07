import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "src/guards/auth.guard";
import { AuthenticatedGuard } from "src/guards/authenticate.guard";


@Controller("auth")
export class AuthController{
    constructor(private readonly authService : AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    Login(@Request() req){
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
    logout(@Request() req): any {
        req.session.destroy()
        return { 
            msg: 'The user session has ended' 
        }
    }
 

}