import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {
            id: 1,
            description: 'Piedra del Alma',
            done: false
        },
        {
            id: 2,
            description: 'Piedra del Espacio',
            done: false
        },
        {
            id: 3,
            description: 'Piedra del Poder',
            done: true
        },
        {
            id: 4,
            description: 'Piedra del tiempo',
            done: false
        }
    ];

    get totalTodos() {
        return this.todos.length;
    }

    get completedTodos() {
        return this.todos.filter(todo => todo.done === true).length;
    }

    get pendingTodos() {
        return this.todos.filter(todo => todo.done === false).length;
    }

    findAll(statusArgs?: StatusArgs): Todo[] {


        console.log('statusArgs', statusArgs);

        const { status } = statusArgs;

        if (status !== undefined) {
            return this.todos.filter(todo => todo.done === status);
        }

        return this.todos;
    }

    findOne(id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);

        return todo;
    }

    create( createTodoInput: CreateTodoInput ): Todo {
        const todo = new Todo();
        todo.description = createTodoInput.description;

        /**
         * Explicacion para el futuro 
         * 
         *  this.todos.map(todo => todo.id) regresa un array de ids
         * 
         * ejemplo [1,2,3]
         * 
         * luego utiliza el operado spreat ...
         * 
         * esto es como si hicieramos lo siguiente
         * 
         * Math.max(1,2,3)
         * 
         * luego si el array hubiera llegado vacio []
         * 
         * tendriamos 
         * 
         * Math.max() por eso se le añade un cero
         * 
         * Math.max(0)
         * 
         * luego se le suma uno para que empiece en 1
         * 
         * Math.max(0) + 1
         */

        todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;

        this.todos.push(todo);

        return todo;
    }

    update( updateTodoInput: UpdateTodoInput): Todo {
        const { id, description, done } = updateTodoInput;
        const todoUpdate = this.findOne(id);

        if (description) todoUpdate.description = description;
        if (done !== undefined) todoUpdate.done = done;

        this.todos = this.todos.map(todo => {
            return (todo.id === id) ? todoUpdate : todo; 
        })

        return todoUpdate;
    }

    delete(id: number) {
        const todo = this.findOne(id)

        this.todos = this.todos.filter(todo => todo.id !== id); 

        return true;
    }
}
