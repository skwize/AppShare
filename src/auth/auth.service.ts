import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly users: UsersService,
        private jwt: JwtService
    ){}

    async register(data: RegisterUserDto): Promise<any> {
        const hash = await this._generateHash(data.password)
        const user = await this.users.createOne({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            password: hash
        });

        return await this._generateToken({
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        })
    
    }

    async login (payload: LoginUserDto): Promise<any> {

        if(!payload) {
            throw new HttpException('Login or password is invalid', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.users.findUserByUsername(payload.username);

        if(!user || !await this._verifyHash(payload.password, user.password)) {
            throw new HttpException('Login or password is invalid', HttpStatus.UNAUTHORIZED);
        }

        return await this._generateToken({
            firstname: user.firstname,
            lastname: user.lastname || "",
            username: user.username,
            id: user.id
        });
    }

    private async _verifyHash(payload: string, hash: string): Promise<boolean> {

        if (!await bcrypt.compare(payload, hash)){
            return false;
        }

        return true;
    }

    private async _generateHash (payload: string): Promise<string> {
        return await bcrypt.hash(payload, 10);
    }

    private async _generateToken (payload: TokenPayloadDto): Promise<{access_token: string}> {
        return {access_token: await this.jwt.sign(payload)}
    }
}
