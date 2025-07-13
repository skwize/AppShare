import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Dto } from "src/lib/dto/Dto";

export class AuthUserDto extends Dto<AuthUserDto> {

    @IsNotEmpty()
    @IsUUID()
    id: string

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    hash: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsString()
    lastname?: string;
}