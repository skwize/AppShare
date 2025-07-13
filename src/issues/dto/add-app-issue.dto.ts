import { IsNotEmpty, IsString } from "class-validator";
import { Dto } from "src/lib/dto/Dto";

export class AddAppIssueDto extends Dto<AddAppIssueDto> {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string
}