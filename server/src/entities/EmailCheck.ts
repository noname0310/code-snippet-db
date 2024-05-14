import { Field, ObjectType } from 'type-graphql';
import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class EmailCheck extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
        id!: string;

    @PrimaryColumn()
        verifyId!: string;

    @Column()
        email!: string;

    @Column()
        verified!: boolean;
    
    @CreateDateColumn()
        createdAt!: Date;
}
