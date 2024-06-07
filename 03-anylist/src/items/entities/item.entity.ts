import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


/**
 *  Nota: como se puede apreciar se puede tener una entidad y un 
 *  objectType conviviendo juntos 
 */

@Entity({ name: 'items' })
@ObjectType()
export class Item {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID) // <---- Esto le dice a graphQL que es un string y es el identificador unico de la tabla
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Field(() => Float)
  @Column()
  quantity: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  quantityUnits?: string;
}
