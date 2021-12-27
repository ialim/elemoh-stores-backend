import { CoreEntity } from 'src/common/entities/core.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

export type FulfillmentState =
  | 'Created'
  | 'Pending'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

@Entity()
export class Fulfillment extends CoreEntity {
  @Column('varchar') state: FulfillmentState;

  @Column({ default: '' })
  trackingCode: string;

  @Column()
  method: string;

  @Column()
  handlerCode: string;

  @ManyToMany((type) => OrderItem, (orderItem) => orderItem.fulfillments)
  orderItems: OrderItem[];
}
