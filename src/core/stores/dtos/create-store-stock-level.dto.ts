import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StoreStockLevel } from '../entities/store-stock-level.entity';

@InputType()
export class CreateStoreStockLevelInput extends OmitType(StoreStockLevel, [
  'createdAt',
  'updatedAt',
  'id',
  'store',
  'variant',
]) {
  @Field((type) => Number)
  storeId: number;
  variantId: number;
}

@ObjectType()
export class CreateStoreStockLevelOutput extends CoreOutput {}
