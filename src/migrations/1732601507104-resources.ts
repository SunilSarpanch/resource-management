import { MigrationInterface, QueryRunner } from "typeorm";

export class Resources1732601507104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('query runner is up');
        await queryRunner.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE resources (
                id SERIAL PRIMARY KEY,
                resource_type VARCHAR(255) NOT NULL, -- e.g., document, link, file
                resource_url TEXT NOT NULL, -- URL or path of the resource
                user_id INT NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                is_expired BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "resources"`); 
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
