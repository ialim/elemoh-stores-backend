import { StockMovementType } from 'src/common/generated-types';
import { OrderItem } from '../../orders/entities/order-item.entity';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from './stock-movement.entity';

@ChildEntity()
export class Cancellation extends StockMovement {
  readonly type = StockMovementType.CANCELLATION;

  @ManyToOne((type) => OrderItem, (orderItem) => orderItem.cancellation)
  orderItem: OrderItem;
}
