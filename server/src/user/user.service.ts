import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dtos/createUserDto";
import { Model } from "mongoose";
import { User, UserDocument } from "./schema/user.schema";
import * as bcrypt from "bcrypt"; 
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
) {}

    async register(createDto: CreateUserDto){
        const userExist = await this.userModel.findOne({email: createDto.email})
        if(userExist){
            throw new ConflictException('user already exist with this email')
        }
        const userNameExist = await this.userModel.findOne({username: createDto.username})
        if(userNameExist){
            throw new ConflictException('username already exist use another one')
        }
        const hashedPassword = await bcrypt.hash(createDto.password,10)
        const created = new this.userModel({
            ...createDto,
            password: hashedPassword
        })
        const user = await created.save()
        const token = this.jwtService.sign({_id: user._id})
        return { token, user };
    }
}