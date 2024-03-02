import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Авторизация и регистрация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Получить пользователей' })
  @Get()
  @UseGuards(AuthGuard())
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
  @ApiOperation({ summary: 'Заблокировать пользователя' })
  @Put('/banned/:id')
  @UseGuards(AuthGuard())
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
