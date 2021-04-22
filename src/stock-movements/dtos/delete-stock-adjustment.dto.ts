import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteStockAdjustmentInput {
  @Field((type) => Number)
  stockAdjustmentId: number;
}

@ObjectType()
export class DeleteStockAdjustmentOutput extends CoreOutput {}
