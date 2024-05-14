
import { Mutation, Arg } from 'type-graphql';
import { EmailCheck } from '../../entities/EmailCheck';
import { ApolloError } from 'apollo-server-errors';
import { getEmailJwt } from '../../auth/emailToken';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';
import { EmailService } from '../../services/EmailService';
import { EmailCheckRepository } from '../../db/repositories';
import { v4 as uuidv4 } from 'uuid';

@Service()
export default class EmailResolver {
    constructor(
        private readonly emailService: EmailService,
        private readonly emailCheckRepository: EmailCheckRepository
    ) {}

    @Mutation(() => EmailCheck)
    async requestEmailCheck(
        @Arg('email') email: string
    ) {
        const verifyId = nanoid(10);
        
        try {
            await this.emailService.sendEmailCheckEmail(verifyId, email);
        } catch(e) {
            console.log(e);
            throw new ApolloError('Failed to send email');
        }

        const emailCheck = await this.emailService.addEmailCheck(email, verifyId);

        return emailCheck;
    }
    @Mutation(() => Boolean)
    async requestResetPasswordEmail(
        @Arg('email') email: string
    ) {
        const verifyId = nanoid(10);
        const emailCheckId = uuidv4();
        
        try {
            await this.emailService.sendResetPasswordEmail(emailCheckId, verifyId, email);
        } catch(e) {
            throw new ApolloError('Failed to send email');
        }

        const emailCheck = await this.emailService.addEmailCheck(email, verifyId, emailCheckId);
        emailCheck;
        return true;
    }
    @Mutation(() => Boolean)
    async verifyEmail(
        @Arg('verifyId') verifyId: string
    ) {
        const emailCheck = await this.emailCheckRepository.findOne({ where: { verifyId } });
        if(!emailCheck)
            throw new ApolloError('Invalid verifyId');
            
        emailCheck.verified = true;
        await emailCheck.save();

        return true;
    }
    @Mutation(() => String)
    async issueEmailToken(
        @Arg('emailCheckId') emailCheckId: string
    ) {
        const emailCheck = await this.emailCheckRepository.findOne({ where: { id: emailCheckId } });
        if(!emailCheck)
            throw new ApolloError('wrong emailCheckId');
        if(!emailCheck.verified)
            throw new ApolloError('Email not verified yet');
        
        const email = emailCheck.email;
        const emailJWT = getEmailJwt(email);

        await emailCheck.remove();
        
        return emailJWT;
    }
}
