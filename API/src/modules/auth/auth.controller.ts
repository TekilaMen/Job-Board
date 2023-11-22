import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('user'))
    @Post('login/user')
    async loginuser(@Request() req) {
    return this.authService.login(req.user, 'user');
    }

    @UseGuards(AuthGuard('entreprise'))
    @Post('login/entreprise')
    async loginentreprise(@Request() req) {
    return this.authService.login(req.user, 'entreprise');
    }
}
