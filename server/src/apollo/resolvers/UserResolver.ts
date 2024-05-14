import { Mutation, Query, Resolver, Arg, Authorized, Ctx } from 'type-graphql';
import { GoogleUser, LocalUser, LocalUserInput, User, UserUpdate } from '../../entities/User';
import bcrypt from 'bcrypt';
import { ApolloContext } from '../apolloServer';
import { getUserAccessJwt, getUserJwtById, getUserRefreshToken } from '../../auth/userToken';
import { ApolloError } from 'apollo-server-errors';
import { assignPartial } from '@lunuy/assign-partial';
import { Service } from 'typedi';
import { GoogleUserRepository, LocalUserRepository, UserRepository } from '../../db/repositories';
import { GoogleAuth } from '../../auth/google';
import { getEmailToken } from '../../auth/emailToken';
import { InitJWT } from '../types/JWT';

async function hashPassword(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
}

@Resolver(User)
@Service()
export default class UserResolver {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly localUserRepository: LocalUserRepository,
        private readonly googleUserRepository: GoogleUserRepository,
        private readonly googleAuth: GoogleAuth
    ) {}

    @Query(() => User)
    async User(
        @Arg('id') id: string
    ) {
        const user = await this.userRepository.findOne({ where: { id } });
        if(!user)
            throw new ApolloError('User not found');
        return user;
    }

    @Authorized()
    @Query(() => User)
    async currentUser(
        @Ctx() ctx: ApolloContext
    ) {
        return await this.userRepository.findOne({ where: { id: ctx.userToken!.id } });
    }

    @Query(() => Boolean)
    async isEmailUsed(
        @Arg('email') email: string
    ) {
        return await this.localUserRepository.count({ where: { email } }) === 1 ? true : false;
    }

    @Mutation(() => User, { nullable: true })
    async registerLocal(
        @Arg('user') userInput: LocalUserInput
    ) {
            
        const email = getEmailToken(userInput.emailToken);
        if(!email)
            return new ApolloError('Email token not valid');
        if(await this.isEmailUsed(email.email))
            return new ApolloError('Email already used');

        const user = new LocalUser();
        assignPartial(user, userInput, ['username']);
        user.email = email.email;
        user.password = await bcrypt.hash(userInput.password, await bcrypt.genSalt());
        await user.save();

        return user;
    }

    @Mutation(() => InitJWT)
    async loginLocal(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Arg('rememberMe') rememberMe: boolean
    ) {
        const user = await this.localUserRepository.findOne({ where: { email } });
        
        if(!user)
            throw new ApolloError('User not found or password not match');

        if(!await bcrypt.compare(password, user.password))
            throw new ApolloError('User not found or password not match');

        return getUserJwtById(user.id, rememberMe);
    }

    @Mutation(() => InitJWT)
    async loginGoogle(
        @Arg('idToken') idToken: string,
        @Arg('rememberMe') rememberMe: boolean
    ) {
        const tokenPayload = await this.googleAuth.verifyIdToken(idToken);

        if(!tokenPayload) {
            throw new Error('Invalid token');
        }

        const user = await this.googleUserRepository.findOne({ where: { sub: tokenPayload.sub } });
        if(user) {
            return getUserJwtById(user.id, rememberMe);
        } else {
            const user = new GoogleUser();
            user.sub = tokenPayload.sub;
            user.username = tokenPayload.name ?? '-';
            await user.save();

            return getUserJwtById(user.id, rememberMe);
        }
    }

    @Mutation(() => String)
    async refreshAccessToken(
        @Arg('refreshToken') refreshToken: string
    ) {
        const token = getUserRefreshToken(refreshToken);

        if(token === null)
            throw new ApolloError('Refresh token not valid');
        
        return getUserAccessJwt({ id: token.id });
    }

    @Authorized()
    @Mutation(() => User)
    async updateUser(
        @Arg('user') userUpdate: UserUpdate,
        @Ctx() ctx: ApolloContext
    ) {
        const user = (await this.userRepository.findOne({ where: { id: ctx.userToken!.id }}))!;

        assignPartial(user, userUpdate, ['username']);
        await user.save();

        return user;
    }

    @Authorized()
    @Mutation(() => User)
    async changePassword(
        @Arg('oldPassword') oldPassword: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() ctx: ApolloContext
    ) {
        const user = (await this.localUserRepository.findOne({ where: { id: ctx.userToken!.id }}));

        if(!user)
            throw new ApolloError('User not found');

        if(!await bcrypt.compare(oldPassword, user.password))
            throw new ApolloError('Old password not match');

        user.password = await hashPassword(newPassword);
        await user.save();

        return user;
    }
    
    @Mutation(() => User)
    async resetPassword(
        @Arg('emailToken') emailToken: string,
        @Arg('password') password: string
    ) {
        const email = getEmailToken(emailToken);
        if(!email)
            throw new ApolloError('Email token not valid');
        
        const user = await this.localUserRepository.findOne({ where: { email: email.email } });
        if(!user)
            throw new ApolloError('User not found');
        
        user.password = await hashPassword(password);
        await user.save();

        return user;
    }
}
