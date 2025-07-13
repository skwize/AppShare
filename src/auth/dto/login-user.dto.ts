import { IsNotEmpty, IsString } from "class-validator";
import { Dto } from "src/lib/dto/Dto";

export class LoginUserDto extends Dto<LoginUserDto> {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}