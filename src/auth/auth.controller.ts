import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {

    constructor( private readonly service: AuthService){}

    @HttpCode(HttpStatus.CREATED)
    @Post('/signup')
    async signUp (@Body() body: RegisterUserDto): Promise<any> {
        return await this.service.register(body);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    async signIn (@Body() body: LoginUserDto): Promise<any> {
        return await this.service.login(body);
    }
}
