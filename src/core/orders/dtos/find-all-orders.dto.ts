import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';

@ObjectType()
export class AllOrderOutput extends CoreOutput {
  @Field((type) => [Order], { nullable: true })
  orders?: Order[];
}
