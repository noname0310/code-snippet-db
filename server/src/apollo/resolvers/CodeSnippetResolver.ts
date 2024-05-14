import { assignPartial } from '@lunuy/assign-partial';
import { ApolloError } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { CodeSnippetRepository, UserRepository } from '../../db/repositories';
import { CodeSnippet, CodeSnippetInput, CodeSnippetUpdate } from '../../entities/CodeSnippet';
import { ApolloContext } from '../apolloServer';

@Service()
@Resolver()
export class CodeSnippetResolver {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly codeSnippetRepository: CodeSnippetRepository
    ) {}

    @Query(() => [CodeSnippet])
    async snippets() {
        return await this.codeSnippetRepository.find();
    }

    @Authorized()
    @Query(() => [CodeSnippet])
    async mySnippets(
        @Ctx() ctx: ApolloContext
    ) {
        const snippets = await this.codeSnippetRepository.find({
            where: {
                author: {
                    id: ctx.userToken!.id
                }
            }
        });

        return snippets;
    }

    @Authorized()
    @Mutation(() => CodeSnippet)
    async createSnippet(
        @Ctx() ctx: ApolloContext,
        @Arg('snippet') snippet: CodeSnippetInput
    ) {
        const user = (await this.userRepository.findOne({ where: { id: ctx.userToken!.id } }))!;

        const newSnippet = this.codeSnippetRepository.create({
            name: snippet.name,
            author: Promise.resolve(user),
            description: snippet.description,
            content: snippet.content,
            contentLanguage: snippet.contentLanguage
        });
        await newSnippet.save();

        return newSnippet;
    }

    @Authorized()
    @Mutation(() => CodeSnippet)
    async updateSnippet(
        @Ctx() ctx: ApolloContext,
        @Arg('id', () => Int) id: number,
        @Arg('snippet', () => CodeSnippetUpdate) snippetUpdate: CodeSnippetUpdate
    ) {
        const snippet = await this.codeSnippetRepository.findOne({ where: { id } });
        if (!snippet) {
            throw new ApolloError('Snippet not found');
        }

        if((await snippet.author).id !== ctx.userToken!.id) {
            throw new ApolloError('You are not allowed to update this snippet');
        }
        
        assignPartial(snippet, snippetUpdate, ['name', 'description', 'content']);
        await snippet.save();

        return snippet;
    }

    @Authorized()
    @Mutation(() => Int)
    async removeSnippet(
        @Ctx() ctx: ApolloContext,
        @Arg('id', () => Int) id: number
    ) {
        const snippet = await this.codeSnippetRepository.findOne({ where: { id } });
        if (!snippet) {
            throw new ApolloError('Snippet not found');
        }

        if((await snippet.author).id !== ctx.userToken!.id) {
            throw new ApolloError('You are not allowed to remove this snippet');
        }

        await snippet.remove();

        return id;
    }
}
