import { Controller, Get } from "@nestjs/common";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userSerive: UserService){}
    
    
}