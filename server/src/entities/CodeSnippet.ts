import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { Length } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity('code_snippet')
export class CodeSnippet extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
        id!: number;

    @Field()
    @Column('mediumtext')
        name!: string;

    @Field(() => User)
    @ManyToOne(() => User)
        author!: Promise<User>;

    @Field()
    @Column('longtext')
        description!: string;

    @Field()
    @Column('longtext')
        content!: string;

    @Field()
    @Column()
        contentLanguage!: string;

    @Field()
    @CreateDateColumn()
        createdAt!: Date;
}

@InputType()
export class CodeSnippetInput {
    @Field()
    @Length(1, 100)
        name!: string;

    @Field()
        description!: string;

    @Field()
        content!: string;

    @Field()
        contentLanguage!: string;
}

@InputType()
export class CodeSnippetUpdate {
    @Field()
    @Length(1, 100)
        name!: string;

    @Field()
        description!: string;

    @Field()
        content!: string;
}
