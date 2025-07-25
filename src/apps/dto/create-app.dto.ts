import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Dto } from "src/lib/dto/Dto";


export class CreateAppDto extends Dto<CreateAppDto> {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description?: string;

    @IsString()
    icon?: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    ownerId: string;

    @IsArray()
    issues: string[];

    @IsString()
    link?: string;

}