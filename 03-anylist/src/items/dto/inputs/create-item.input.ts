import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';


@InputType()
export class CreateItemInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string

  @Field(() => Float)
  @IsPositive()
  quantity: number;


  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  quantityUnits?: string;
}
