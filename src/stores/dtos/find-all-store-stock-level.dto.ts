import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StoreStockLevel } from '../entities/store-stock-level.entity';

@ObjectType()
export class AllStoreStockLevelOutput extends CoreOutput {
  @Field((type) => [StoreStockLevel], { nullable: true })
  storeStockLevels?: StoreStockLevel[];
}
