import { InputType, ObjectType } from '@nestjs/graphql';
import { StockMovementType } from 'src/common/generated-types';
import { ChildEntity } from 'typeorm';
import { StockMovement } from './stock-movement.entity';

@InputType('StockAdjustmentInputType')
@ObjectType()
@ChildEntity()
export class StockAdjustment extends StockMovement {
  readonly type = StockMovementType.ADJUSTMENT;
}
