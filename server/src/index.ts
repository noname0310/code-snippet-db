
import 'reflect-metadata';
import { PORT, DEVELOPMENT } from './const';
import http from 'http';
import { getDataSource } from './db/mysql';
import { getApolloServer, getSchema } from './apollo/apolloServer';
import { addRepositories } from './db/repositories';
import { ContainerInstance } from 'typedi';
import { GOOGLE_OAUTH_CLIENT_ID, SMTP_HOST, SMTP_PORT, SMTP_SECURE } from './secret';
import { GoogleAuth } from './auth/google';
import { EmailService } from './services/EmailService';
import nodemailer from 'nodemailer';
import express from 'express';
import cors from 'cors';
import { PubSubService } from './services/PubSubService';

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE
});

async function main() {
    const app = express();
    const server = http.createServer(app);

    app.use(cors({ origin: '*', credentials: true }));

    const mysqlDataSource = await(await getDataSource()).initialize();

    const container = new ContainerInstance(Math.random().toString());
    addRepositories(container, mysqlDataSource);
    container.set(GoogleAuth, new GoogleAuth(GOOGLE_OAUTH_CLIENT_ID));
    container.set(EmailService, new EmailService(transporter));
    const pubSub = new PubSubService();
    container.set(PubSubService, pubSub);
    
    const schema = await getSchema(pubSub, container);
    const apolloServer = await getApolloServer(schema, DEVELOPMENT);

    await apolloServer.start();
    apolloServer.applyMiddleware({
        app: app as import('apollo-server-express/node_modules/@types/express').Application,
        cors: false
    });

    server.listen(PORT, () => {
        console.log('Server running');
    });
}

main();
