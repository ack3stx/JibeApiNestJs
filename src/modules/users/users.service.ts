import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Rol } from 'src/modules/rol/entities/rol.entity'
import { Not, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    private jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUserDto: LoginUserDto) {
    try {
        const { email, password } = loginUserDto;
        
        console.log('Login attempt for email:', email);
        
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['rol']
        });
        
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        console.log('User found:', { 
            id: user.id, 
            email: user.email,
            hasPassword: !!user.password 
        });
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password validation result:', isPasswordValid);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Contraseña inválida');
        }

        const token = await this.jwtService.signAsync({
            id: user.id,
            nombre: user.Nombre,
            Apellido_Paterno: user.Apellido_Paterno,
            Apellido_Materno: user.Apellido_Materno,
            email: user.email,
            rol: user.rol?.id
        });

        return {
            access_token: token,
            success: true
        }
    } catch (error) {
        console.error('Login error:', error);
        
        if (error instanceof UnauthorizedException) {
            throw error;
        }
        
        throw new UnauthorizedException(
            error.message || 'Error en el proceso de login'
        );
    }
}

    async register(CreateUserDto: CreateUserDto) {
        try{
            const { email, password, nombre, Apellido_Paterno, Apellido_Materno,isActive, rol_id } = CreateUserDto;
            const rol = await this.rolRepository.findOne({
                where: {
                    id: rol_id
                }
            });

            if (!rol) {
                throw new UnauthorizedException('Invalid rol');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User();

            user.email = email;
            user.password = hashedPassword;
            user.Nombre = nombre;
            user.Apellido_Paterno = Apellido_Paterno;
            user.Apellido_Materno = Apellido_Materno;
            user.isActive = isActive;
            user.rol = rol;

            await this.userRepository.save(user);

            return {
                success: true,
                message: 'User created successfully'
            }
        } catch (error) {
            throw new UnauthorizedException('Error In register process');
        }
    }

    async FindAllUsers() {
    try {
        const users = await this.userRepository.find({
            select: {
                id: true,
                Nombre: true,
                Apellido_Paterno: true,
                Apellido_Materno: true,
            },
            where: {
                rol: {
                    id: Not(1)
                }
            }
        });
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new UnauthorizedException('Error fetching users');
    }
}
}
