import { Field, InputType, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Adjustment, TaxLine } from 'src/common/generated-types';
import { Fulfillment } from 'src/core/fulfillments/entities/fulfillment.entity';
import { Refund } from 'src/core/refunds/entities/refund.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@InputType('OrderItemInput', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @Column()
  listPrice: number;

  @Column()
  listPriceIncludesTax: boolean;

  @Field((type) => GraphQLJSON)
  @Column('simple-json')
  adjustments: Adjustment[];

  @Field((type) => GraphQLJSON)
  @Column('simple-json')
  taxLines: TaxLine[];

  @Field((type) => [Fulfillment])
  @ManyToMany((type) => Fulfillment, (fulfillment) => fulfillment.orderItems)
  @JoinTable()
  fulfillments: Fulfillment[];

  @ManyToOne((type) => Refund)
  refund: Refund;

  @Column({ nullable: true })
  refundId: number | null;

  @Column({ default: false })
  cancelled: boolean;
}
