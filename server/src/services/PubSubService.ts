import { PubSub } from 'graphql-subscriptions';
import { Service } from 'typedi';

@Service()
export class PubSubService extends PubSub {
    constructor() {
        console.log('Pubsub service constructed');
        super();
    }
}
