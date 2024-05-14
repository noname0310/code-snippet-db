import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity('code_snippet')
export class CodeSnippet extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
        id!: number;

    @Field()
    @Column()
        name!: string;

    @Field(() => User)
    @ManyToOne(() => User)
        author!: Promise<User>;

    @Field()
    @Column()
        description!: string;

    @Field()
    @Column()
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
        name!: string;

    @Field()
        description!: string;

    @Field()
        content!: string;
}
