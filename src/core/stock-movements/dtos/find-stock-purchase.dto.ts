import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StockPurchase } from '../entities/stock-purchase.entity';

@ArgsType()
export class FindStockPurchaseInput {
  @Field((type) => Number)
  stockPurchaseId: number;
}

@ObjectType()
export class FindStockPurchaseOutput extends CoreOutput {
  @Field((type) => StockPurchase, { nullable: true })
  stockPurchase?: StockPurchase;
}
