import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { StockMovementType } from 'src/common/generated-types';
import { ChildEntity, Column } from 'typeorm';
import { StockMovement } from './stock-movement.entity';

@InputType('StockAdjustmentInputType', { isAbstract: true })
@ObjectType()
@ChildEntity()
export class StockAdjustment extends StockMovement {
  readonly type = StockMovementType.ADJUSTMENT;

  @Field((type) => String)
  @Column()
  @IsString()
  note: string;
}
