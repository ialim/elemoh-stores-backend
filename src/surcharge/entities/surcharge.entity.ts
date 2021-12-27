import { CoreEntity } from 'src/common/entities/core.entity';
import { TaxLine } from 'src/common/generated-types';
import { OrderModification } from 'src/orders/entities/order-modification.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @Column('simple-json')
  taxLines: TaxLine[];

  @ManyToOne((type) => Order, (order) => order.surcharges, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToOne(
    (type) => OrderModification,
    (orderModification) => orderModification.surcharges,
  )
  orderModification: OrderModification;
}
