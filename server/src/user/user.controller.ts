import { Controller, Body, Get, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { CreateUserDto } from "./dtos/createUserDto";
import { UserService } from "./user.service";
import { setAuthCookie } from "src/utils/setAuthCookie";


@Controller('users')
export class UserController {
    constructor( private readonly userService: UserService) {}

    @Post()
    async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response){
        const {token, user} = await this.userService.register(dto);
        return setAuthCookie(res, token, user)
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) res:Response){
        res.clearCookie('auth_token',{
            httpOnly: true,
            sameSite: 'none',
            secure: true, 
        })
        return {message: 'Logged out successfully'}
    }
}