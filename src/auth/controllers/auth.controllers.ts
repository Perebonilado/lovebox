import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { CreateUserDto } from 'src/dto/user.dto';
import { AuthService } from '../services/auth.service';
import { SignupSuccessResponse } from 'src/interfaces/auth';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  public async signup(
    @Body() body: CreateUserDto,
  ): Promise<SignupSuccessResponse> {
    return await this.authService.signUp(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return await this.authService.login(req.user);
  }
}
