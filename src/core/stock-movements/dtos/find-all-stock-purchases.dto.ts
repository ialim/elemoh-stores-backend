import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StockPurchase } from '../entities/stock-purchase.entity';

@ObjectType()
export class AllStockPurchaseOutput extends CoreOutput {
  @Field((type) => [StockPurchase], { nullable: true })
  stockPurchases?: StockPurchase[];
}
