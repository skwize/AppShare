import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}

    async createOne (payload: CreateUserDto): Promise<any> {
        if (!payload){
            throw new BadRequestException("Bad request :(");
        }

        try {
            return await this.prisma.user.create({
                data: {
                    username: payload.username,
                    password: payload.password,
                    firstname: payload.firstname,
                    lastname: payload.lastname || null
                }
            });


        } catch (error) {
            throw new ConflictException(error)
        }
    }

    async findUserByUsername(userName: string): Promise<any> {
        return await this.prisma.user.findUnique({
            where: {
                username: userName
            },
            select:{
                id: true,
                password: true,
                firstname: true,
                lastname: true,
            }
        })
    }
}
