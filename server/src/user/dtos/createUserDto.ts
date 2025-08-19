import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email:string;

    @IsString()
    username:string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 10)
    password:string;
}