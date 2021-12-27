import { StockMovementType } from 'src/common/generated-types';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from './stock-movement.entity';

@ChildEntity()
export class Purchase extends StockMovement {
  readonly type = StockMovementType.PURCHASE;

  @ManyToOne((type) => OrderItem)
  orderItem: OrderItem;
}
