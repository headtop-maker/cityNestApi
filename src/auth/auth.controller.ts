import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get()
  async getAllUsers(): Promise<
    {
      id: number;
      name: string;
      email: string;
      banned: boolean;
      userRole: UserRole;
    }[]
  > {
    return this.authService.allUsers();
  }

  @Put('/banned/:id')
  async bannedUser(
    @Param('id')
    id: string,
    @Body()
    banned: { banned: boolean },
  ): Promise<{
    id: number;
    name: string;
    email: string;
    banned: boolean;
    userRole: UserRole;
  }> {
    return this.authService.updateUser(id, banned);
  }
}
