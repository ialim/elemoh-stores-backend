import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteOrderInput {
  @Field((type) => Number)
  orderId: number;
}

@ObjectType()
export class DeleteOrderOutput extends CoreOutput {}
