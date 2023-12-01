import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Purchase } from '../entities/order-purchase.entity';

@ArgsType()
export class FindOrderPurchaseInput {
  @Field((type) => Number)
  orderPurchaseId: number;
}

@ObjectType()
export class FindOrderPurchaseOutput extends CoreOutput {
  @Field((type) => Purchase)
  purchase?: Purchase;
}
