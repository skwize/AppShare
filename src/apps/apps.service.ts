import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AppsService {
    constructor (private prisma: PrismaService) {}

    async getOne (appId: string) {
        if (!appId){
            throw new NotFoundException("App not found")
        }

        const result = await this.prisma.app.findUnique({
            where: {
                id: appId
            }
        });

        if(!result){
            throw new NotFoundException("App not found")
        }

        return result;
    }

}
