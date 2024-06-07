import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AnylistResolver {
    @Query(() => String)
    helloWorld() {
        return 'hola mundo'
    }
}
