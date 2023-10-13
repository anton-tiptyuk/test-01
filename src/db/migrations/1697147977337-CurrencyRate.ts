import { MigrationInterface, QueryRunner } from 'typeorm';

export class CurrencyRate1697147977337 implements MigrationInterface {
  name = 'CurrencyRate1697147977337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."currency_rate_currency_enum" AS ENUM('USD', 'GBP', 'AUD', 'EUR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "currency_rate" ("currency" "public"."currency_rate_currency_enum" NOT NULL, "date" TIMESTAMP NOT NULL, "value" numeric(22,18) NOT NULL, CONSTRAINT "PK_91393f05add30fdf0ece7a427b6" PRIMARY KEY ("currency", "date"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation" ALTER COLUMN "amount_usd" TYPE numeric(8,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation" ALTER COLUMN "amount_original" TYPE numeric(8,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "statement" ALTER COLUMN "amount" TYPE numeric(8,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statement" ALTER COLUMN "amount" TYPE numeric(50,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation" ALTER COLUMN "amount_original" TYPE numeric(50,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation" ALTER COLUMN "amount_usd" TYPE numeric(50,2)`,
    );
    await queryRunner.query(`DROP TABLE "currency_rate"`);
    await queryRunner.query(`DROP TYPE "public"."currency_rate_currency_enum"`);
  }
}
