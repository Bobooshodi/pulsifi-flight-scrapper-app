import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './models/dto/login.dto';
import { Unprotected } from './guard/guard.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Unprotected()
  @Post('login')
  signIn(@Body() signInDto: LoginDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
