import { Field, Int, ObjectType } from "@nestjs/graphql";

/**
 * ObjectType es un tipo de objeto con el que se crea 
 * mi objeto personalizado para poder hacer peticiones a
 * cada una de las propiedades que estan dentro de el
 * 
 * ahora eso solo le dice a graphql existe un objeto llamado en 
 * este caso Todo pero tadavia no sabe que hay dentro de el 
 * 
 */

/**
 * Ahora para decirle a graphql como luce el objeto tenemos que 
 * agregar unos decoradores adicionales
 */

@ObjectType()
export class Todo {
    
    // se puede agregar una coma despues de Int
    // para agregar informacion como lo hacemos con los query, { name:  }
    @Field(() => Int)
    id: number;

    @Field(() => String)
    description: string;

    @Field(() => Boolean)
    done: boolean = false;
}