
import { Length } from 'class-validator';
import { ObjectType, Field, InputType } from 'type-graphql';
import { Entity, Column, BaseEntity, OneToMany, TableInheritance, PrimaryGeneratedColumn, ChildEntity, CreateDateColumn } from 'typeorm';
import { CodeSnippet } from './CodeSnippet';

@ObjectType()
@Entity('user')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
        id!: string;

    @Field()
    @Column()
        username!: string;

    @Field()
    @CreateDateColumn()
        createdAt!: Date;

    @OneToMany(() => CodeSnippet, codeSnippet => codeSnippet.author)
        snippets!: Promise<CodeSnippet[]>;
}

@ObjectType()
@ChildEntity()
export class LocalUser extends User {
    @Field()
    @Column()
        email!: string;

    @Column()
        password!: string;
}

@ObjectType()
@ChildEntity()
export class GoogleUser extends User {
    @Field()
    @Column()
        sub!: string;
}

@InputType()
export class LocalUserInput {
    @Field()
    @Length(1, 30)
        password!: string;

    @Field()
    @Length(1, 30)
        username!: string;

    @Field()
        emailToken!: string;
}

@InputType()
export class UserUpdate {
    @Field()
    @Length(1, 30)
        username!: string;
}
