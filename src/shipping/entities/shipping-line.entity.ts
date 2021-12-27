import { CoreEntity } from 'src/common/entities/core.entity';
import { Adjustment, TaxLine } from 'src/common/generated-types';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ShippingMethod } from './shipping-method.entity';

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

  @Column('simple-json')
  adjustments: Adjustment[];

  @Column()
  listPriceIncludesTax: boolean;

  @Column('simple-json')
  taxLines: TaxLine[];
}
