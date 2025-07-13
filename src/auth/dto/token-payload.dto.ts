import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Dto } from "src/lib/dto/Dto";

export class TokenPayloadDto extends Dto<TokenPayloadDto> {

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;
    
    @IsString()
    lastname?: string;
}