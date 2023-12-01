import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StockAdjustment } from '../entities/stock-adjustment.entity';

@InputType()
export class EditStockAdjustmentInput extends PartialType(
  OmitType(StockAdjustment, ['id', 'createdAt', 'updatedAt', 'type']),
) {
  @Field((type) => Number)
  productVariantId?: number;

  @Field((type) => Number)
  stockAdjustmentId: number;
}

@ObjectType()
export class EditStockAdjustmentOutput extends CoreOutput {}
