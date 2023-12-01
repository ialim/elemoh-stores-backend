import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { PaymentState } from 'src/common/generated-types';
import { Order } from 'src/core/orders/entities/order.entity';
import { Refund } from 'src/core/refunds/entities/refund.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  @Field((type) => String)
  @Column()
  method: string;

  @Field((type) => Number)
  @Column()
  amount: number;

  @Field((type) => String)
  @Column('varchar')
  state: PaymentState;

  @Field((type) => String)
  @Column({ type: 'varchar', nullable: true })
  errorMessage: string | undefined;

  @Field((type) => String)
  @Column({ nullable: true })
  transactionId: string;

  @Field((type) => Order)
  @ManyToOne((type) => Order, (order) => order.payments)
  order: Order;

  @Field((type) => [Refund])
  @OneToMany((type) => Refund, (refund) => refund.payment)
  refunds: Refund[];
}
