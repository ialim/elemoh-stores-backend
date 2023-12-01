import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StockAdjustment } from '../entities/stock-adjustment.entity';

@ArgsType()
export class FindStockAdjustmentInput {
  @Field((type) => Number)
  stockAdjustmentId: number;
}

@ObjectType()
export class FindStockAdjustmentOutput extends CoreOutput {
  @Field((type) => StockAdjustment, { nullable: true })
  stockAdjustment?: StockAdjustment;
}
