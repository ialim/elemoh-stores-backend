import { StockMovementType } from 'src/common/generated-types';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from './stock-movement.entity';
import { OrderLine } from 'src/core/orders/entities/order-line.entity';
import { InputType, ObjectType } from '@nestjs/graphql';

@InputType('StockCancellationInputType')
@ObjectType()
@ChildEntity()
export class StockCancellation extends StockMovement {
  readonly type = StockMovementType.CANCELLATION;

  @ManyToOne((type) => OrderLine)
  orderCancellation: OrderLine;
}
