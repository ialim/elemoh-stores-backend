import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';

@InputType()
export class CreateOrderInput extends OmitType(Order, [
  'createdAt',
  'updatedAt',
  'id',
  'channels',
  'lines',
  'payments',
  'modifications',
  'user',
  'shippingLines',
]) {
  @Field((type) => Number)
  channelId: number;

  @Field((type) => Number)
  userId: number;
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
