import { Float, Int, Query, Resolver, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    //  @Query es Importante seleccionar el que viene de @nestjs/graphql
    // porque hay 2 

    /**
     * Existen muchos parametros que podemos pasar en el retorno
     * 
     * En este caso
     * 
     * description: da una description de lo que retorna la query
     * name: sera el nombre de la funcion al momento de llamarla en 
     * la query es decir sustituye helloWorld por Hello
     */
    @Query(() => String, { description: 'Hola mundo es lo que retorna', name: 'Hello' })
    helloWorld(): string {
        return 'Hola Mundo';
    }

    @Query(() => Float, { name: 'randomNumber' })
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query(() => Int, { name: 'randomFromZeroTo', description: 'From Zero to Argument TO (default 6)' })
    getRandomFromZeroTo( 
        @Args('to', { type: () => Int, nullable: true }) anotherTo: number = 6
    ): number {
        return Math.floor(Math.random() * anotherTo);
    }

}
