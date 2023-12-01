import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Purchase } from '../entities/order-purchase.entity';

@ObjectType()
export class AllOrderPurchaseOutput extends CoreOutput {
  @Field((type) => [Purchase], { nullable: true })
  purchases?: Purchase[];
}
