import { StockMovementType } from 'src/common/generated-types';
import { OrderLine } from 'src/core/orders/entities/order-line.entity';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from './stock-movement.entity';
import { InputType, ObjectType } from '@nestjs/graphql';

@InputType('StockReleaseInputType')
@ObjectType()
@ChildEntity()
export class StockRelease extends StockMovement {
  readonly type = StockMovementType.RELEASE;

  @ManyToOne((type) => OrderLine)
  orderLineRelease: OrderLine;
}
