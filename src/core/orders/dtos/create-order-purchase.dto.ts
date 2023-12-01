import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Purchase } from '../entities/order-purchase.entity';

@InputType()
export class CreateOrderPurchaseInput extends OmitType(Purchase, [
  'createdAt',
  'updatedAt',
  'id',
  'order',
  'toStore',
  'supplier',
]) {
  @Field((type) => Number)
  orderId: number;

  @Field((type) => Number)
  toStoreId: number;

  @Field((type) => Number)
  supplierId: number;
}

@ObjectType()
export class CreateOrderPurchaseOutput extends CoreOutput {}
