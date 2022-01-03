import { StockMovementType } from 'src/common/generated-types';
import { Order } from 'src/orders/entities/order.entity';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from './stock-movement.entity';

@ChildEntity()
export class StockPurchase extends StockMovement {
  readonly type = StockMovementType.PURCHASE;

  @ManyToOne((type) => Order)
  orderPurchase: Order;
}
