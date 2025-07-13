import { IsNotEmpty, IsString } from "class-validator";
import { Dto } from "src/lib/dto/Dto";

export class ChangeAppDto extends Dto<ChangeAppDto> {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description?: string;

    @IsString()
    icon?: string;

    @IsNotEmpty()
    @IsString()
    appTypeName: string;

    @IsNotEmpty()
    @IsString()
    link: string;
}