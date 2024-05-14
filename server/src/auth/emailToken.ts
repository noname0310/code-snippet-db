
import jwt from 'jsonwebtoken';
import { JWT_EMAIL_TOKEN_SECRET } from '../secret';
import { JWT_EMAIL_TOKEN_EXPIRES_IN } from '../const';

interface EmailToken {
    email: string;
}

export function getEmailToken(token: string): EmailToken | null {
    try {
        return jwt.verify(token, JWT_EMAIL_TOKEN_SECRET) as EmailToken;
    } catch {
        return null;
    }
}

export function getEmailJwt(email: string) {
    const emailData: EmailToken = {
        email
    };
    return jwt.sign(emailData, JWT_EMAIL_TOKEN_SECRET, { expiresIn: JWT_EMAIL_TOKEN_EXPIRES_IN });
}
