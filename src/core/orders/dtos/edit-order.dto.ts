import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';

@InputType()
export class EditOrderInput extends PartialType(
  OmitType(Order, [
    'createdAt',
    'updatedAt',
    'id',
    'channels',
    'lines',
    'payments',
    'modifications',
    'user',
    'shippingLines',
    'code',
  ]),
) {
  @Field((type) => Number)
  orderId: number;

  @Field((type) => Number)
  channelId?: number;

  @Field((type) => Number)
  userId?: number;
}

@ObjectType()
export class EditOrderOutput extends CoreOutput {}
