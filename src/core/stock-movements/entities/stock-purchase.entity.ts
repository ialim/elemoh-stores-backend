import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { StockMovementType } from 'src/common/generated-types';
import { Order } from 'src/core/orders/entities/order.entity';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from './stock-movement.entity';

@InputType('StockPurchaseInputType')
@ObjectType()
@ChildEntity()
export class StockPurchase extends StockMovement {
  readonly type = StockMovementType.PURCHASE;

  @Field((type) => Order)
  @ManyToOne((type) => Order)
  orderPurchase: Order;
}
