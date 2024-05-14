import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class InitJWT {
    @Field()
        refreshToken!: string;

    @Field()
        accessToken!: string;
}
