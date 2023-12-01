import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { FulfillmentState } from 'src/common/generated-types';
import { OrderItem } from 'src/core/orders/entities/order-item.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@InputType('FullfilmentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Fulfillment extends CoreEntity {
  @Field((type) => String)
  @Column('varchar')
  state: FulfillmentState;

  @Field((type) => String)
  @Column({ default: '' })
  trackingCode: string;

  @Field((type) => String)
  @Column()
  method: string;

  @Field((type) => String)
  @Column()
  handlerCode: string;

  @Field((type) => [OrderItem])
  @ManyToMany((type) => OrderItem, (orderItem) => orderItem.fulfillments)
  orderItems: OrderItem[];
}
