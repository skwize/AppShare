import { BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAppDto } from './dto/create-app.dto';
import { ChangeAppDto } from './dto/change-app.dto'; 

@Injectable()
export class AppsService {
    constructor (private prisma: PrismaService) {}

    async getAll(): Promise<Array<Object>> {
        try{
            return await this.prisma.app.findMany({
                select:{
                    id: true,
                    title: true,
                    icon: true,
                    description: true,
                    owner: true,
                }
            });
        } catch {
            throw new NotFoundException("No apps there");
        }
    }

    async getOne(appId: string) {
        try{
            return await this.prisma.app.findUnique({
                where: {
                    id: appId
                },
                select: {
                    title: true,
                    description: true,
                    icon: true,
                    appTypeName: true,
                    owner: true,
                    link: true
                }
            });
        } catch {
            throw new NotFoundException(`Maybe passed id is not valid?`)
        }
    }

    async getAllByUserID (userId: string): Promise<Array<Object>> {
        if (!userId) {
            throw new NotFoundException("No apps found");
        }

        try {
            return await this.prisma.app.findMany({
                where: {
                    ownerId: userId
                }
            });
        } catch {
            throw new NotFoundException("No apps found");
        }
    }

    async createOne (payload: CreateAppDto, userId: string) {
        if (!payload || !userId) {
            throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST);
        }

        const newApp = await this.prisma.app.create({
            data: {
                title: payload.title,
                description: payload.description,
                icon: payload.icon || "",
                link: payload.link || "",
                ownerId: userId,
                appTypeName: payload.type,
            }
        });

        if (!newApp) {
            throw new HttpException("Can't create", HttpStatus.CONFLICT);
        }

        return newApp;
    }


    //TODO:
    // Complete functions below

    async changeOne(payload: ChangeAppDto, appId: string, userId: string): Promise<{success: boolean, error_message: string | boolean}> {
        if (!payload) {
            throw new ConflictException("Conflict!");
        }

        await this.prisma.app.update({
            where: {
                id: appId
            },
            data: {
                title: payload.title,
                description: payload.description,
                icon: payload.icon,
                appTypeName: payload.appTypeName,
                link: payload.link
            }
        }).catch((error)=> {
            console.error(error);
            throw new HttpException('Server felt...', HttpStatus.INTERNAL_SERVER_ERROR);
        });

        return {
            success: true,
            error_message: false
        }
    }

    async removeOne(appId: string, userId: string): Promise<boolean> {

        if (!appId) {
            throw new BadRequestException('Bad request');
        }

        const app = await this.prisma.app.findUnique({
            where: {
                id: appId
            }
        });

        if(!app){
            throw new NotFoundException('App not found!');
        }

        if(app.ownerId !== userId){
            throw new ForbiddenException("This is not your's app"); // REPLACE IT TO 404 EX IF WORK
        }

        await this.prisma.app.delete({
            where: {
                id: appId,
                ownerId: userId
            }
        });


        return true;
    }

}
