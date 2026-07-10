import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilmScheduleTables1720500000000
  implements MigrationInterface
{
  name = 'CreateFilmScheduleTables1720500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "film" (
        "id" uuid PRIMARY KEY,
        "rating" double precision NOT NULL,
        "director" text NOT NULL,
        "tags" text[] NOT NULL DEFAULT '{}',
        "image" text NOT NULL,
        "cover" text NOT NULL,
        "title" text NOT NULL,
        "about" text NOT NULL,
        "description" text NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "schedule" (
        "id" uuid PRIMARY KEY,
        "film_id" uuid NOT NULL REFERENCES "film"("id") ON DELETE CASCADE,
        "daytime" timestamptz NOT NULL,
        "hall" text NOT NULL,
        "rows" integer NOT NULL,
        "seats" integer NOT NULL,
        "price" integer NOT NULL,
        "taken" text[] NOT NULL DEFAULT '{}'
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_schedule_film_id"
      ON "schedule" ("film_id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_schedule_film_id";');
    await queryRunner.query('DROP TABLE IF EXISTS "schedule";');
    await queryRunner.query('DROP TABLE IF EXISTS "film";');
  }
}
