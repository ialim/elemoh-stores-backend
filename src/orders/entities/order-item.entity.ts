import { CoreEntity } from 'src/common/entities/core.entity';
import { Adjustment, TaxLine } from 'src/common/generated-types';
import { Fulfillment } from 'src/fulfillments/entities/fulfillment.entity';
import { Refund } from 'src/refunds/entities/refund.entity';
import { Cancellation } from 'src/stock-movements/entities/stock-cancellation.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { OrderLine } from './order-line.entity';

@Entity()
export class OrderItem extends CoreEntity {
  @Column()
  listPrice: number;

  @ManyToOne((type) => OrderLine, (line) => line.items, { onDelete: 'CASCADE' })
  line: OrderLine;

  @Column()
  listPriceIncludesTax: boolean;

  @Column('simple-json')
  adjustments: Adjustment[];

  @Column('simple-json')
  taxLines: TaxLine[];

  @ManyToMany((type) => Fulfillment, (fulfillment) => fulfillment.orderItems)
  @JoinTable()
  fulfillments: Fulfillment[];

  @ManyToOne((type) => Refund)
  refund: Refund;

  @Column({ nullable: true })
  refundId: number | null;

  @OneToOne((type) => Cancellation, (cancellation) => cancellation.orderItem)
  cancellation: Cancellation;

  @Column({ default: false })
  cancelled: boolean;
}
