import { IsArray, IsNotEmpty } from "class-validator";
import { Dto } from "src/lib/dto/Dto";


export class CreateAppDto extends Dto<CreateAppDto> {

    @IsNotEmpty()
    title: string;

    description?: string;
    icon?: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    ownerId: string;

    @IsArray()
    issues: string[];

}