import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Dto } from "src/lib/dto/Dto";

export class RegisterUserDto extends Dto<RegisterUserDto> {

        @IsNotEmpty()
        @IsString()
        @MinLength(3, {
            message: "Username can't be shorter than 3 characters"
        })
        username: string;
    
        @IsNotEmpty()
        @MinLength(8, {
            message: "Password must be at least 8 characters"
        })
        @IsStrongPassword()
        password: string;
    
        @IsNotEmpty()
        @IsString()
        firstname: string;
    
        @IsString()
        lastname?: string;
}