import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RoleGuard } from 'src/auth/guards/role/role.guard';
import { UserGuard } from 'src/auth/guards/UserGuard.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ENPOINT PARA INICIAR SESION
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  // ENPOINT PARA REGISTRAR UN NUEVO USUARIO
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  // ENPOINT PARA OBTENER TODOS LOS USUARIOS MENOS SISTEMAS
  @Get()
  @UseGuards(UserGuard)
  async findAllUsers() {
    return this.usersService.FindAllUsers();
  }

}
