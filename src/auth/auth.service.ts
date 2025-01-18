import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './models/user';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
  private readonly users = [
    {
      userId: 1,
      username: 'test',
      password: '1234',
    },
    {
      userId: 2,
      username: 'user',
      password: 'pass',
    },
  ];

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
