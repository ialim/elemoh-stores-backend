import { StockMovementType } from 'src/common/generated-types';
import { OrderLine } from 'src/orders/entities/order-line.entity';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from './stock-movement.entity';

@ChildEntity()
export class Release extends StockMovement {
  readonly type = StockMovementType.RELEASE;

  @ManyToOne((type) => OrderLine)
  orderLineRelease: OrderLine;
}
