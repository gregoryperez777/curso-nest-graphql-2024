import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

/**
 * Ahora en la carpeta DTO hay 2 subcarpeta inputs y Args ambos son DTO (Data transfer Objects) y
 * se usan para validar data que estamos recibiendo pero la diferencia entre ambas es que 
 * 
 * Inputs hace referencia a los datos que vienen dentro del body de la peticion 
 * 
 * Args hace referencia a los argumentos que queremos recibir 
 * 
 */

@ArgsType()
export class StatusArgs {
    @Field(() => Boolean, { description: 'status todo', nullable: true })
    @IsOptional()
    @IsBoolean()
    status: boolean;
}