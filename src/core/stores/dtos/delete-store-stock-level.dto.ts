import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteStoreStockLevelInput {
  @Field((type) => Number)
  storeStockLevelId: number;
}

@ObjectType()
export class DeleteStoreStockLevelOutput extends CoreOutput {}
