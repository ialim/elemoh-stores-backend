import { StockMovementType } from 'src/common/generated-types';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from 'src/core/stock-movements/entities/stock-movement.entity';
import { OrderLine } from 'src/core/orders/entities/order-line.entity';
import { InputType, ObjectType } from '@nestjs/graphql';

@InputType('StockAllocationInputType')
@ObjectType()
@ChildEntity()
export class StockAllocation extends StockMovement {
  readonly type = StockMovementType.ALLOCATION;

  @ManyToOne((type) => OrderLine)
  orderLineAlloc: OrderLine;
}
