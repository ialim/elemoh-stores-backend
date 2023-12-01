import { StockMovementType } from 'src/common/generated-types';
import { ChildEntity, ManyToOne } from 'typeorm';
import { StockMovement } from 'src/core/stock-movements/entities/stock-movement.entity';
import { Order } from 'src/core/orders/entities/order.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('StockSaleInputType')
@ObjectType()
@ChildEntity()
export class StockSale extends StockMovement {
  readonly type = StockMovementType.SALE;

  @Field((type) => Order)
  @ManyToOne((type) => Order)
  orderSale: Order;
}
