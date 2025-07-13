import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAppDto } from './dto/create-app.dto';
import { ChangeAppDto } from './dto/change-app.dto';

@Controller('apps')
export class AppsController {
    constructor (private readonly service: AppsService) {}

    @Get("/")
    async getAllApps (): Promise<Array<Object>> {
        return await this.service.getAll();
    }

    @Get("/:id")
    async getOneById (@Param("id") id: string): Promise<Object | null> {
        return await this.service.getOne(id);
    }

    @Get("/owner/:id")
    async getAllByOwner (@Param("id") id: string): Promise<Array<Object>> {
        return await this.service.getAllByUserID(id);
    }


    @UseGuards(AuthGuard)
    @Post("/create")
    async createOneApp (@Body() body: CreateAppDto, @Req() req): Promise<Object> {
        return await this.service.createOne(body, req.user.id);
    }

    @UseGuards(AuthGuard)
    @Patch("/change/:id")
    async changeOneApp (@Param("id") id: string, @Body() body: ChangeAppDto, @Req() req): Promise<any> {
        return await this.service.changeOne(body, id, req.user.id);
    }

    @UseGuards(AuthGuard)
    @Delete("/remove/:id")
    async removeOneApp(@Param("id") id: string, @Req() req): Promise<Object> {
        if (!await this.service.removeOne(id, req.user.id)){
            return {
                success: false,
                message: "App wasn't delete"
            }
        }

        return {
            success: true,
            message: "App was deleted"
        }
    }

}
