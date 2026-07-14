import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilmScheduleTables1720500000000
  implements MigrationInterface
{
  name = 'CreateFilmScheduleTables1720500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "films" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "rating" double precision NOT NULL,
        "director" varchar NOT NULL,
        "tags" text NOT NULL,
        "image" varchar NOT NULL,
        "cover" varchar NOT NULL,
        "title" varchar NOT NULL,
        "about" varchar NOT NULL,
        "description" varchar NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "schedules" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "daytime" varchar NOT NULL,
        "hall" integer NOT NULL,
        "rows" integer NOT NULL,
        "seats" integer NOT NULL,
        "price" double precision NOT NULL,
        "taken" text NOT NULL DEFAULT '',
        "filmId" uuid REFERENCES "films"("id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_schedules_filmId"
      ON "schedules" ("filmId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_schedules_filmId";');
    await queryRunner.query('DROP TABLE IF EXISTS "schedules";');
    await queryRunner.query('DROP TABLE IF EXISTS "films";');
  }
}
