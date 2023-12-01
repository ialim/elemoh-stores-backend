import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';

@ArgsType()
export class FindOrderInput {
  @Field((type) => Number)
  orderId: number;
}

@ObjectType()
export class FindOrderOutput extends CoreOutput {
  @Field((type) => Order)
  order?: Order;
}
