import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StockPurchase } from '../entities/stock-purchase.entity';

@InputType()
export class CreateStockPurchaseInput extends OmitType(StockPurchase, [
  'id',
  'createdAt',
  'updatedAt',
  'type',
  'productVariant',
  'orderPurchase',
]) {
  @Field((type) => Number)
  productVariantId: number;

  @Field((type) => Number)
  orderPurchaseId: number;
}

@ObjectType()
export class CreateStockPurchaseOutput extends CoreOutput {}
