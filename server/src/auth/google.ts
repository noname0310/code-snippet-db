import { OAuth2Client } from 'google-auth-library';

export class GoogleAuth {
    private client: OAuth2Client;
    constructor(private readonly clientId: string) {
        this.client = new OAuth2Client(clientId);
    }
    async verifyIdToken(idToken: string) {
        const ticket = await this.client.verifyIdToken({
            idToken: idToken,
            audience: this.clientId,
        });
        return ticket.getPayload();
    }
}
