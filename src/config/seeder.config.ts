import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { RoleSeeder } from '../migrations/seedersMigration/RoleSeeder';
import AppDataSource from './datasource';

const runSeeds = async () => {
    await AppDataSource.initialize();
    await runSeeders(AppDataSource, {
        seeds: [RoleSeeder]
    });
    await AppDataSource.destroy();
};

runSeeds();