import { Field, ObjectType } from '@nestjs/graphql';
import { Store } from 'src/stores/entities/store.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@ObjectType()
@Entity()
export class Purchase extends Order {
  @Field((type) => Store)
  @ManyToOne((type) => Store)
  toStore: Store;

  @Field((type) => Supplier)
  @ManyToOne((type) => Supplier, (supplier) => supplier.purchases)
  supplier: Supplier;
}
