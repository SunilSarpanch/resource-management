import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"

@Entity({ name: "resources" })
export class Resource {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: "resource_type"})
    resourceType: string;  // e.g., 'document', 'link', 'file'
  
    @Column("text", { name: "resource_url"})
    resourceUrl: string;
  
    @Column({ name: "user_id"})
    userId: number;
  
    @Column({ name: "expires_at"})
    expiresAt: Date;
  
    @Column({ name:"is_expired", default: false })
    isExpired: boolean;

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
