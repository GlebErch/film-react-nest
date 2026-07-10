import { readFileSync } from 'fs';
import { join } from 'path';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTestData1720500001000 implements MigrationInterface {
  name = 'SeedTestData1720500001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const baseDir = process.cwd();
    const filmsSql = readFileSync(
      join(baseDir, 'test', 'prac.films.sql'),
      'utf8',
    );
    const schedulesSql = readFileSync(
      join(baseDir, 'test', 'prac.shedules.sql'),
      'utf8',
    );

    await queryRunner.query(filmsSql);
    await queryRunner.query(schedulesSql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "schedule" WHERE "id" IN (
        'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
        '5beec101-acbb-4158-adc6-d855716b44a8',
        '89ee32f3-8164-40a6-b237-f4d492450250',
        '9647fcf2-d0fa-4e69-ad90-2b23cff15449',
        '9f2db237-01d0-463e-a150-89f30bfc4250',
        '3d5f5d12-b4d8-44d3-a440-1b91616fda40'
      );`,
    );
    await queryRunner.query(
      `DELETE FROM "film" WHERE "id" IN (
        '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
        '51b4bc85-646d-47fc-b988-3e7051a9fe9e'
      );`,
    );
  }
}
