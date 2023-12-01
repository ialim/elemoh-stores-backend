import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StockPurchase } from '../entities/stock-purchase.entity';

@InputType()
export class EditStockPurchaseInput extends PartialType(
  OmitType(StockPurchase, [
    'id',
    'createdAt',
    'updatedAt',
    'type',
    'orderPurchase',
    'productVariant',
  ]),
) {
  @Field((type) => Number)
  productVariantId?: number;

  @Field((type) => Number)
  orderPurchaseId?: number;

  @Field((type) => Number)
  stockPurchaseId: number;
}

@ObjectType()
export class EditStockPurchaseOutput extends CoreOutput {}
