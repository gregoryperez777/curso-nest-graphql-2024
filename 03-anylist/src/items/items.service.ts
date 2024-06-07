import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {

  constructor(

    /**
     * Utilizamos InjectRepository para que itemRepository sea posible 
     * de inyectar porque no basta solamente con importar Repository ya 
     * que no tiene ninguna relacion con nest si te fijas bien Repository 
     * viene de typeorm
     * 
     */

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>
  ) {} 

  async create(createItemInput: CreateItemInput) : Promise<Item> {
    const newItem = this.itemRepository.create(createItemInput);
    return await this.itemRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    // Todo: filtrar, paginar, por usuario
    return await this.itemRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`Item with ${id} not found`)
    }

    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    
    /**
     * preload busca el id del objeto dado y sobreescribe los valores
     * con los que estan en el nuevo objeto
     * 
     * si el id no es encontrado return un error
     * 
     * si el objeto en este caso UpdateItemInput solo trae id y ningun campo 
     * entonces no se sobreescribiria nada 
     *  
     */
    const item = await this.itemRepository.preload(updateItemInput);

    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);

    return this.itemRepository.save(item);
  }

  async remove(id: string): Promise<Item> {

    // TOOD: soft delete, integridad referencial
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);

    return { ...item, id };
  }
}
