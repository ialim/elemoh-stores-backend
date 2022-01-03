import { CoreEntity } from 'src/common/entities/core.entity';
import { Adjustment, TaxLine } from 'src/common/generated-types';
import { Fulfillment } from 'src/fulfillments/entities/fulfillment.entity';
import { Refund } from 'src/refunds/entities/refund.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class OrderItem extends CoreEntity {
  @Column()
  listPrice: number;

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

  @Column({ default: false })
  cancelled: boolean;
}
