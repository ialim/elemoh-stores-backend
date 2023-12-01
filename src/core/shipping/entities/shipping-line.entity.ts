import { CoreEntity } from 'src/common/entities/core.entity';
import { Adjustment, TaxLine } from 'src/common/generated-types';
import { Order } from 'src/core/orders/entities/order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ShippingMethod } from './shipping-method.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType('ShippingLineInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ShippingLine extends CoreEntity {
  @Column()
  shippingMethodId: number;

  @ManyToOne(
    (type) => ShippingMethod,
    (shippingMethod) => shippingMethod.shippingLines,
  )
  shippingMethod: ShippingMethod | null;

  @ManyToOne((type) => Order, (order) => order.shippingLines)
  order: Order;

  @Column()
  listPrice: number;

  @Field((type) => GraphQLJSON)
  @Column('simple-json')
  adjustments: Adjustment[];

  @Column()
  listPriceIncludesTax: boolean;

  @Field((type) => GraphQLJSON)
  @Column('simple-json')
  taxLines: TaxLine[];
}
