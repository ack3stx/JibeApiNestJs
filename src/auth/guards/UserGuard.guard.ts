import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid token');
    }
    console.log('UserGuard: User authenticated successfully', user);
    return user;
  }
}