import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from 'src/addresses/entities/address.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { OrderAddress } from 'src/common/generated-types';
import { Payment } from 'src/payments/entities/payment.entity';
import { Refund } from 'src/refunds/entities/refund.entity';
import { Surcharge } from 'src/surcharge/entities/surcharge.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Order } from './order.entity';

@ObjectType()
@Entity()
export class OrderModification extends CoreEntity {
  @Field((type) => String)
  @Column()
  note: string;

  @Field((type) => Order)
  @ManyToOne((type) => Order, (order) => order.modifications, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToMany((type) => OrderItem)
  @JoinTable()
  orderItems: OrderItem[];

  @OneToMany((type) => Surcharge, (surcharge) => surcharge.orderModification)
  surcharges: Surcharge[];

  @Column()
  priceChange: number;

  @OneToOne((type) => Payment)
  @JoinColumn()
  payment?: Payment;

  @OneToOne((type) => Refund)
  @JoinColumn()
  refund?: Refund;

  @Column('simple-json', { nullable: true })
  shippingAddressChange: OrderAddress;

  @Column('simple-json', { nullable: true })
  billingAddressChange: OrderAddress;
}
