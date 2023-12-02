import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    singUpDto: SignUpDto,
  ): Promise<{ token: string; role: UserRole }> {
    const { name, email, password, banned, userRole } = singUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      banned,
      userRole,
    });

    const token = this.jwtService.sign({ id: user._id });

    const role = await this.userModel.findOne({ email });

    return { token, role: role.userRole };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; role: UserRole; name: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Ошибка пользователя или пароля');
    }

    const isPasswordMathched = await bcrypt.compare(password, user.password);
    if (!isPasswordMathched) {
      throw new UnauthorizedException('Ошибка пользователя или пароля');
    }
    const token = this.jwtService.sign({ id: user._id });

    const role = await this.userModel.findOne({ email });

    return { token, role: role.userRole, name: role.name };
  }

  async allUsers(): Promise<
    {
      name: string;
      email: string;
      banned: boolean;
      userRole: UserRole;
    }[]
  > {
    const users = await this.userModel.find();

    const filtred = users.map((item) => ({
      name: item.name,
      email: item.email,
      banned: item.banned,
      userRole: item.userRole,
    }));

    return filtred;
  }
}
