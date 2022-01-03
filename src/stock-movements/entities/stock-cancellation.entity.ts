import { StockMovementType } from 'src/common/generated-types';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from './stock-movement.entity';
import { OrderLine } from 'src/orders/entities/order-line.entity';

@ChildEntity()
export class Cancellation extends StockMovement {
  readonly type = StockMovementType.CANCELLATION;

  @ManyToOne((type) => OrderLine)
  orderCancellation: OrderLine;
}
