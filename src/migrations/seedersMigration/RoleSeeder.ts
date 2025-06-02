import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Rol } from '../../modules/rol/entities/rol.entity'
import { User } from '../../modules/users/entities/user.entity'
import * as bcrypt from 'bcrypt';

export class RoleSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const roleRepository = dataSource.getRepository(Rol);
        const userRepository = dataSource.getRepository(User);

        const roles = [
            {
                id: 1,
                name: 'Sistemas',
                description: 'Sistemas'
            },
            {
                id: 2,
                name: 'GerenteMTTO',
                description: 'GerenteMTTO'
                
            },
            {
                id: 3,
                name: 'planner',
                description: 'planner'
            },
            {
                id: 4,
                name: 'tecnico encargado',
                description: 'tecnico encargado'
                
            },
            {
                id:5,
                name: 'Cliente',
                description: 'Cliente'
            }
        ];

        const savedRoles = await roleRepository.save(roles);

        const users = [
            {
                id: 1,
                Nombre: 'sistemas',
                Apellido_Paterno: 'sistemas',
                Apellido_Materno: 'sistemas',
                email: 'sistemas@gmail.com',
                password: '1234',
                isActive: '1'

            },
            {
                id: 2,
                Nombre: 'Nelson Ivan',
                Apellido_Paterno: 'Banda',
                Apellido_Materno: 'De la Torre',
                email: 'nelsonbanda@jibe.com.mx',
                password: '1234',
                rol_id: 2,
                isActive: '1'
            },
            {
                id: 3,
                Nombre: 'JOSE EDUARDO',
                Apellido_Paterno: 'CASTRO',
                Apellido_Materno: 'SAUCEDO',
                email: 'CASTROSAUCEDOJOSEEDUARDO@jibe.com.mx',
                password: '1234',
                rol_id: 3,
                isActive: '1'
            },
            {
                id: 4,
                Nombre: 'ASKARY',
                Apellido_Paterno: 'DIAZ',
                Apellido_Materno: 'SANCHEZ',
                email: 'DIAZSANCHEZASKARY@jibe.com.mx',
                password: '1234',
                rol_id: 4,
                isActive: '1'
            },
            {
                id: 5,
                Nombre: 'LUCIO',
                Apellido_Paterno: 'GOMEZ',
                Apellido_Materno: 'LUNA',
                email: 'luciogomez@jibe.com.mx',
                password: '1234',
                rol_id: 5,
                isActive: '1'
            },
            {
                id: 6,
                Nombre: 'MARCO ANTONIO',
                Apellido_Paterno: 'SIFUENTES',
                Apellido_Materno: 'MARTINEZ',
                email: 'marcosifuentes@jibe.com.mx',
                password: '1234',
                rol_id: 5,
                isActive: '1'
            },
            {
                id: 7,
                Nombre: 'JOSE ALBERTO',
                Apellido_Paterno: 'ROCHA',
                Apellido_Materno: 'SOTELO',
                email: 'joserocha@jibe.com.mx',
                password: '1234',
                rol_id: 5,
                isActive: '1'
            },
            {
                id: 8,
                Nombre: 'MIGUEL ALDAHIR',
                Apellido_Paterno: 'GOMEZ',
                Apellido_Materno: 'BOLAÑOS',
                email: 'miguelgomez@jibe.com.mx',
                password: '1234',
                rol_id: 5,
                isActive: '1'
            },
            {
                id: 9,
                Nombre: 'OLGUER MANUEL',
                Apellido_Paterno: 'RODRIGUEZ',
                Apellido_Materno: 'DIAZ',
                email: 'olguerrodriguez@jibe.com.mx',
                password: '1234',
                rol_id: 5,
                isActive: '1'
            },
            {
                id: 10,
                Nombre: 'ERICK URIEL',
                Apellido_Paterno: 'VILLARREAL',
                Apellido_Materno: 'FLOREZ',
                email: 'erickvillarreal@jibe.com.mx',
                password: '1234',
                rol_id: 5,
                isActive: '1'
            },
            {
                id: 11,
                Nombre: 'LUIS ENRIQUE',
                Apellido_Paterno: 'GONZALEZ',
                Apellido_Materno: 'GARAY',
                email: 'luisgonzalez@jibe.com.mx',
                password: '1234',
                rol_id: 5,
                isActive: '1'
            }
        ]

        await userRepository.save(users);

         const hashedUsers = await Promise.all(users.map(async user => ({
            ...user,
            password: await bcrypt.hash(user.password, 10)
        })));

        await userRepository.save(hashedUsers);
    }
}