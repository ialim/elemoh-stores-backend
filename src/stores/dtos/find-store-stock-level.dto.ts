import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StoreStockLevel } from '../entities/store-stock-level.entity';

@ArgsType()
export class FindStoreStockLevelInput {
  @Field((type) => Number)
  storeStockLevelId: number;
}

@ObjectType()
export class FindStoreStockLevelOutput extends CoreOutput {
  @Field((type) => StoreStockLevel)
  storeStockLevel?: StoreStockLevel;
}
