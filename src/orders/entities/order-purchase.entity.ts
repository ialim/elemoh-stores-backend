import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Store } from 'src/stores/entities/store.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Order } from './order.entity';

@ObjectType()
@Entity()
export class Purchase extends CoreEntity {
  @Field((type) => Order)
  @OneToOne((type) => Order)
  @JoinColumn()
  order: Order;

  @Field((type) => Store)
  @ManyToOne((type) => Store)
  toStore: Store;

  @Field((type) => Supplier)
  @ManyToOne((type) => Supplier, (supplier) => supplier.purchases)
  supplier: Supplier;
}
