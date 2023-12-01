import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StoreStockLevel } from '../entities/store-stock-level.entity';

@InputType()
export class EditStoreStockLevelInput extends PartialType(
  OmitType(StoreStockLevel, [
    'createdAt',
    'updatedAt',
    'id',
    'variant',
    'store',
  ]),
) {
  @Field((type) => Number)
  storeStockLevelId: number;

  @Field((type) => Number)
  storeId?: number;

  @Field((type) => Number)
  variantId?: number;
}

@ObjectType()
export class EditStoreStockLevelOutput extends CoreOutput {}
