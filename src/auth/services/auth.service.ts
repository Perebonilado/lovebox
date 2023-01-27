import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupSuccessResponse } from 'src/interfaces/auth';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryptionService: EncryptionService,
  ) {}

  public async signUp(body: CreateUserDto): Promise<SignupSuccessResponse> {
    try {
      const userAlreadyExists = await this.userService.userAccountExists({
        username: body.username,
        email: body.email,
      });
      if (userAlreadyExists)
        throw new HttpException(
          'Username or Email already taken',
          HttpStatus.BAD_REQUEST,
        );
      else {
        const { email, _id: sub } = await this.userService.create(body);
        const user = {email, sub}
        return {
          message: 'Successful',
          token: this.jwtService.sign({ user }),
        };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.userService.findOneUser(email);
    if (user) {
      const isValidPassword = await this.encryptionService.decryptValue({
        hash: user.password,
        password: password,
      });
      if (isValidPassword) {
        return { email: user.email, sub: user._id };
      }
    }
    return null;
  }

  public async login(user: Express.User) {
    return {
      message: 'successful',
      access_token: this.jwtService.sign({ user }),
    };
  }
}
