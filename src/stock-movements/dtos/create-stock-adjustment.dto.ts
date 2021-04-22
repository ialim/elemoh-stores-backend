import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StockAdjustment } from '../entities/stock-adjustment.entity';

@InputType()
export class CreateStockAdjustmentInput extends OmitType(StockAdjustment, [
  'id',
  'createdAt',
  'updatedAt',
  'type',
]) {
  @Field((type) => Number)
  productVariantId: number;
}

@ObjectType()
export class CreateStockAdjustmentOutput extends CoreOutput {}
