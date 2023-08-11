import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
      @ApiBody({type: CreateUserDto})
  async login(@Request() req) {
    return req.user;
  }
}
