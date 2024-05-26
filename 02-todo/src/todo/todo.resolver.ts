import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto'
import { AggregationsType } from './dto/types/aggregations.type';

/**
 * Nota:
 * 
 * @Query es usado para realizar consultas y regresar la data. Se podria decir que las Querys son similares al metodos HTTP GET
 * @Mutation es usado para mutar la data. Se podria decir que las mutations son similares a los metodos HTTP -> POST, PUT y DELETE
 * 
 */

/**
 * Es buena practica indicar en el decorador Resolver el tipo de 
 * dato con el que estará trabajando
 * 
 * En este caso estara trabajando con Todo que es un Entity
 * y un Entity es el esquema de la BD para esa tabla o collection 
 */
@Resolver(() => Todo)
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ){}
    // [Todo] es un arreglo de Todos para Graphql
    // Todo[] es un arreglo de Todos para Typescript
    @Query(() => [Todo], { name: 'todos' })
    findAll(
        // Para mi lo natural seria hacer esto pero parece que no se puede
        // sino que hay que confiar que Graphql infiera el tipo
        // como nota personal esto deberia usarse si es un tipo definido por nosotros
        // pero no para tipos comunes
        // @Args('statusArgs', { type: () =>  StatusArgs, nullable: true}) statusArgs?: StatusArgs
        @Args() statusArgs?: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query(() => Todo, { name: 'todo' })
    findOne(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.findOne(id)
    }

    @Mutation(() => Todo, { name: 'createTodo' })
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ) {
        return this.todoService.create(createTodoInput)
    }

    @Mutation(() => Todo, { name: 'updateTodo' })
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) {
        return this.todoService.update(updateTodoInput)
    }

    @Mutation(() => Boolean)
    removeTodo(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.delete(id);
    }

    // aggregation
    @Query(() => Int, { name: 'totalTodos' })
    totalTodos(): number {
        return this.todoService.totalTodos;
    }

    @Query(() => Int, { name: 'completedTodos' })
    completedTodos(): number {
        return this.todoService.completedTodos;
    }

    @Query(() => Int, { name: 'pendingTodos' })
    pendingTodos(): number {
        return this.todoService.pendingTodos;
    }

    @Query( () => AggregationsType)
    aggregations(): AggregationsType {
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodosCompleted: this.todoService.completedTodos,
        }
    }
}
