import { Field, InputType, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { CoreEntity } from 'src/common/entities/core.entity';
import { TaxLine } from 'src/common/generated-types';
import { OrderModification } from 'src/core/orders/entities/order-modification.entity';
import { Order } from 'src/core/orders/entities/order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('SurchargeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Surcharge extends CoreEntity {
  @Column()
  description: string;

  @Column()
  listPrice: number;

  @Column()
  listPriceIncludesTax: boolean;

  @Column()
  sku: string;

  @Field((type) => GraphQLJSON)
  @Column('simple-json')
  taxLines: TaxLine[];

  // @ManyToOne((type) => Order, (order) => order.surcharges, {
  //   onDelete: 'CASCADE',
  // })
  order: Order;

  @ManyToOne(
    (type) => OrderModification,
    (orderModification) => orderModification.surcharges,
  )
  orderModification: OrderModification;
}
