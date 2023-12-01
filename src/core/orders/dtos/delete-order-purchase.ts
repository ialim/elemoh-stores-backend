import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteOrderPurchaseInput {
  @Field((type) => Number)
  orderPurchaseId: number;
}

@ObjectType()
export class DeleteOrderPurchaseOutput extends CoreOutput {}
