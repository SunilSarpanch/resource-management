import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @BeforeInsert()
    insertDates() {
        this.createdAt = new Date()
    }

    @BeforeUpdate()
    updateDates() {
        this.updatedAt = new Date()
    }

}
