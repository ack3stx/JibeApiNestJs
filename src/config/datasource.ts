import { DataSource } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME,
    entities: [
        join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}'),
        join(__dirname, '..', 'core', 'database', '*.entity.{ts,js}')
    ],
    migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
    synchronize: false,
});

export default AppDataSource;