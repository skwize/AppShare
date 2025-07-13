import { IsNotEmpty, IsString } from "class-validator";
import { Dto } from "src/lib/dto/Dto";

export class AppIssueDto extends Dto<AppIssueDto> {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    appId: string;

    @IsNotEmpty()
    @IsString()
    senderId: string;
}