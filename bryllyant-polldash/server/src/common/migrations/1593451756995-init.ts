import {MigrationInterface, QueryRunner} from "typeorm";

export class init1593451756995 implements MigrationInterface {
    name = 'init1593451756995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "text" character varying(5000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "polls" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_b9bbb8fc7b142553c518ddffbb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "responses_status_enum" AS ENUM('pristine', 'viewed', 'completed')`);
        await queryRunner.query(`CREATE TABLE "responses" ("id" SERIAL NOT NULL, "status" "responses_status_enum" NOT NULL, "responseQuestions" json, "html" character varying, "mock" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "distributionId" integer, "userId" integer, CONSTRAINT "PK_be3bdac59bd243dff421ad7bf70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(144) NOT NULL, "mobile" character varying(40) NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'user', "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "adminId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "distributions" ("id" SERIAL NOT NULL, "subject" character varying(500) NOT NULL, "body" character varying(10000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "pollId" integer, "adminId" integer, CONSTRAINT "PK_b73beffd2ed658ba71d8bd7d820" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "polls_questions_questions" ("pollsId" integer NOT NULL, "questionsId" integer NOT NULL, CONSTRAINT "PK_118336068b1c68b05a7672b5928" PRIMARY KEY ("pollsId", "questionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_44b98f1bfc6ef5da0b8fd55b48" ON "polls_questions_questions" ("pollsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f19475f765a3e8fd7f916abf92" ON "polls_questions_questions" ("questionsId") `);
        await queryRunner.query(`CREATE TABLE "users_groups_groups" ("usersId" integer NOT NULL, "groupsId" integer NOT NULL, CONSTRAINT "PK_1cf09013aa7a345778eaeb5a421" PRIMARY KEY ("usersId", "groupsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1b46034fbd69664807cb4afb16" ON "users_groups_groups" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_270e39efd76d142903fd6ed528" ON "users_groups_groups" ("groupsId") `);
        await queryRunner.query(`CREATE TABLE "distributions_recipient_groups_groups" ("distributionsId" integer NOT NULL, "groupsId" integer NOT NULL, CONSTRAINT "PK_53213c9812f51a4f2560f497c87" PRIMARY KEY ("distributionsId", "groupsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0da2b7dcbc19300b70d9db7e2" ON "distributions_recipient_groups_groups" ("distributionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fdd27c2d14d13214c4368856d3" ON "distributions_recipient_groups_groups" ("groupsId") `);
        await queryRunner.query(`CREATE TABLE "distributions_recipient_users_users" ("distributionsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_36e782abeaa68d6a261314e12e9" PRIMARY KEY ("distributionsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_98778ffb4e642f717791704ba7" ON "distributions_recipient_users_users" ("distributionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_702af96353b026877d1d19c097" ON "distributions_recipient_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_accb24ba8f4f213f33d08e2a20f" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_ca251175a93ed97051be0df6e6f" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "polls" ADD CONSTRAINT "FK_04ae69533b190bcf8a0650665d2" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_ab8201a818a670233955f75af92" FOREIGN KEY ("distributionId") REFERENCES "distributions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_a9814d310833f66dab2c24314d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distributions" ADD CONSTRAINT "FK_77705ed63be09537e9a867dde60" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distributions" ADD CONSTRAINT "FK_8f12e30b1a349cc7c740b4db511" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "polls_questions_questions" ADD CONSTRAINT "FK_44b98f1bfc6ef5da0b8fd55b48b" FOREIGN KEY ("pollsId") REFERENCES "polls"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "polls_questions_questions" ADD CONSTRAINT "FK_f19475f765a3e8fd7f916abf92f" FOREIGN KEY ("questionsId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_groups_groups" ADD CONSTRAINT "FK_1b46034fbd69664807cb4afb16f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_groups_groups" ADD CONSTRAINT "FK_270e39efd76d142903fd6ed528f" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distributions_recipient_groups_groups" ADD CONSTRAINT "FK_b0da2b7dcbc19300b70d9db7e29" FOREIGN KEY ("distributionsId") REFERENCES "distributions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distributions_recipient_groups_groups" ADD CONSTRAINT "FK_fdd27c2d14d13214c4368856d30" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distributions_recipient_users_users" ADD CONSTRAINT "FK_98778ffb4e642f717791704ba73" FOREIGN KEY ("distributionsId") REFERENCES "distributions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distributions_recipient_users_users" ADD CONSTRAINT "FK_702af96353b026877d1d19c0973" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "distributions_recipient_users_users" DROP CONSTRAINT "FK_702af96353b026877d1d19c0973"`);
        await queryRunner.query(`ALTER TABLE "distributions_recipient_users_users" DROP CONSTRAINT "FK_98778ffb4e642f717791704ba73"`);
        await queryRunner.query(`ALTER TABLE "distributions_recipient_groups_groups" DROP CONSTRAINT "FK_fdd27c2d14d13214c4368856d30"`);
        await queryRunner.query(`ALTER TABLE "distributions_recipient_groups_groups" DROP CONSTRAINT "FK_b0da2b7dcbc19300b70d9db7e29"`);
        await queryRunner.query(`ALTER TABLE "users_groups_groups" DROP CONSTRAINT "FK_270e39efd76d142903fd6ed528f"`);
        await queryRunner.query(`ALTER TABLE "users_groups_groups" DROP CONSTRAINT "FK_1b46034fbd69664807cb4afb16f"`);
        await queryRunner.query(`ALTER TABLE "polls_questions_questions" DROP CONSTRAINT "FK_f19475f765a3e8fd7f916abf92f"`);
        await queryRunner.query(`ALTER TABLE "polls_questions_questions" DROP CONSTRAINT "FK_44b98f1bfc6ef5da0b8fd55b48b"`);
        await queryRunner.query(`ALTER TABLE "distributions" DROP CONSTRAINT "FK_8f12e30b1a349cc7c740b4db511"`);
        await queryRunner.query(`ALTER TABLE "distributions" DROP CONSTRAINT "FK_77705ed63be09537e9a867dde60"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_a9814d310833f66dab2c24314d2"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_ab8201a818a670233955f75af92"`);
        await queryRunner.query(`ALTER TABLE "polls" DROP CONSTRAINT "FK_04ae69533b190bcf8a0650665d2"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_ca251175a93ed97051be0df6e6f"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_accb24ba8f4f213f33d08e2a20f"`);
        await queryRunner.query(`DROP INDEX "IDX_702af96353b026877d1d19c097"`);
        await queryRunner.query(`DROP INDEX "IDX_98778ffb4e642f717791704ba7"`);
        await queryRunner.query(`DROP TABLE "distributions_recipient_users_users"`);
        await queryRunner.query(`DROP INDEX "IDX_fdd27c2d14d13214c4368856d3"`);
        await queryRunner.query(`DROP INDEX "IDX_b0da2b7dcbc19300b70d9db7e2"`);
        await queryRunner.query(`DROP TABLE "distributions_recipient_groups_groups"`);
        await queryRunner.query(`DROP INDEX "IDX_270e39efd76d142903fd6ed528"`);
        await queryRunner.query(`DROP INDEX "IDX_1b46034fbd69664807cb4afb16"`);
        await queryRunner.query(`DROP TABLE "users_groups_groups"`);
        await queryRunner.query(`DROP INDEX "IDX_f19475f765a3e8fd7f916abf92"`);
        await queryRunner.query(`DROP INDEX "IDX_44b98f1bfc6ef5da0b8fd55b48"`);
        await queryRunner.query(`DROP TABLE "polls_questions_questions"`);
        await queryRunner.query(`DROP TABLE "distributions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
        await queryRunner.query(`DROP TABLE "responses"`);
        await queryRunner.query(`DROP TYPE "responses_status_enum"`);
        await queryRunner.query(`DROP TABLE "polls"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "groups"`);
    }

}
