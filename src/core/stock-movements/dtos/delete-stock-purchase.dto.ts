import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteStockPurchaseInput {
  @Field((type) => Number)
  stockPurchaseId: number;
}

@ObjectType()
export class DeleteStockPurchaseOutput extends CoreOutput {}
