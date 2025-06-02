import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid token');
    }
    
    if(user.rol === null){
      throw new UnauthorizedException('User has no rol');
    }


    if( user.rol === 2 || user.rol === 3 || user.rol === 1) {
      return user;
    }
    else{
      throw new UnauthorizedException('User does not have permission '+ user.rol_id);
    }

  }
}