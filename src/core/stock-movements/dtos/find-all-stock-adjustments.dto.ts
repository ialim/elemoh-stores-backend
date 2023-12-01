import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StockAdjustment } from '../entities/stock-adjustment.entity';

@ObjectType()
export class AllStockAdjustmentOutput extends CoreOutput {
  @Field((type) => [StockAdjustment], { nullable: true })
  stockAdjustments?: StockAdjustment[];
}
