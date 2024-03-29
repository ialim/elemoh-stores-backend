import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { RefundState } from 'src/common/generated-types';
import { OrderItem } from 'src/core/orders/entities/order-item.entity';
import { Payment } from 'src/core/payments/entities/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@InputType('RefundInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Refund extends CoreEntity {
  @Column() items: number;

  @Column() shipping: number;

  @Column() adjustment: number;

  @Column() total: number;

  @Column() method: string;

  @Column({ nullable: true }) reason: string;

  @Column('varchar') state: RefundState;

  @Column({ nullable: true }) transactionId: string;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.refund)
  @JoinTable()
  orderItems: OrderItem[];

  @ManyToOne((type) => Payment)
  @JoinColumn()
  payment: Payment;

  @Column()
  paymentId: number;

  @Column('simple-json') metadata: string;
}
