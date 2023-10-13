import { MigrationInterface, QueryRunner } from 'typeorm';

export class Entities1696971975296 implements MigrationInterface {
  name = 'Entities1696971975296';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "department" ("id" integer NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" integer NOT NULL, "name" character varying(100) NOT NULL, "surname" character varying(100) NOT NULL, "department_id" integer NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "statement" ("id" integer NOT NULL, "amount" numeric(50,2) NOT NULL, "date" TIMESTAMP NOT NULL, "employee_id" integer NOT NULL, CONSTRAINT "PK_d2ef88cb44b99f3332a1eebb96f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."donation_currency_enum" AS ENUM('USD', 'GBP', 'AUD', 'EUR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "donation" ("id" integer NOT NULL, "amount_usd" numeric(50,2) NOT NULL, "amount_original" numeric(50,2) NOT NULL, "currency" "public"."donation_currency_enum" NOT NULL, "date" TIMESTAMP NOT NULL, "employee_id" integer NOT NULL, CONSTRAINT "PK_25fb5a541964bc5cfc18fb13a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "statement" ADD CONSTRAINT "FK_a2ef72e4600ac383bf19acff78f" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation" ADD CONSTRAINT "FK_9c18c48a16228aa4ee995216829" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "donation" DROP CONSTRAINT "FK_9c18c48a16228aa4ee995216829"`,
    );
    await queryRunner.query(
      `ALTER TABLE "statement" DROP CONSTRAINT "FK_a2ef72e4600ac383bf19acff78f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`,
    );
    await queryRunner.query(`DROP TABLE "donation"`);
    await queryRunner.query(`DROP TYPE "public"."donation_currency_enum"`);
    await queryRunner.query(`DROP TABLE "statement"`);
    await queryRunner.query(`DROP TABLE "employee"`);
    await queryRunner.query(`DROP TABLE "department"`);
  }
}
