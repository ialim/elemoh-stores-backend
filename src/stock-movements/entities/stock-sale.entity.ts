import { StockMovementType } from 'src/common/generated-types';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from 'src/stock-movements/entities/stock-movement.entity';
import { OrderLine } from 'src/orders/entities/order-line.entity';

@ChildEntity()
export class Sale extends StockMovement {
  readonly type = StockMovementType.SALE;

  @ManyToOne((type) => OrderLine)
  orderLineSale: OrderLine;
}
