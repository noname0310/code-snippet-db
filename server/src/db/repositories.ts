import { ContainerInstance } from 'typedi';
import { DataSource, Repository } from 'typeorm';
import { EmailCheck } from '../entities/EmailCheck';
import { CodeSnippet } from '../entities/CodeSnippet';
import { GoogleUser, LocalUser, User } from '../entities/User';

// Repository<T> cannot be used for DI, so we create a Repository class for each T to make DI possible.
// Each Repository class is not actually used, as it can do exactly the same thing as a normal Repository,
// and is only used to identify T for Repository<T> in the part that receives the Repository.
// T can be identified by Entity.

export class UserRepository extends Repository<User> {
    static Entity = User;
}

export class LocalUserRepository extends Repository<LocalUser> {
    static Entity = LocalUser;
}

export class GoogleUserRepository extends Repository<GoogleUser> {
    static Entity = GoogleUser;
}

export class EmailCheckRepository extends Repository<EmailCheck> {
    static Entity = EmailCheck;
}

export class CodeSnippetRepository extends Repository<CodeSnippet> {
    static Entity = CodeSnippet;
}

export const repositories = [
    UserRepository,
    LocalUserRepository,
    GoogleUserRepository,
    EmailCheckRepository,
    CodeSnippetRepository
];

export function addRepositories(containerInstance: ContainerInstance, dataSource: DataSource) {
    for(const repositoryClass of repositories) {
        containerInstance.set(repositoryClass, dataSource.getRepository(repositoryClass.Entity));
    }

    return containerInstance;
}
