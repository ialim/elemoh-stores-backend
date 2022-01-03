import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { Address } from 'src/addresses/entities/address.entity';
import { Channel } from 'src/channels/entities/channel.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { CurrencyCode, OrderAddress } from 'src/common/generated-types';
import { Payment } from 'src/payments/entities/payment.entity';
import { ShippingLine } from 'src/shipping/entities/shipping-line.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { OrderLine } from './order-line.entity';
import { OrderModification } from './order-modification.entity';

export type OrderState =
  | 'Created'
  | 'AddingItems'
  | 'ArrangingPayment'
  | 'PaymentAuthorized'
  | 'PaymentSettled'
  | 'PartiallyShipped'
  | 'Shipped'
  | 'PartiallyDelivered'
  | 'Delivered'
  | 'Modifying'
  | 'ArrangingAdditionalPayment'
  | 'Cancelled';

@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @Field((type) => User)
  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @Field((type) => String)
  @IsString()
  @Column()
  code: string;

  @Field((type) => String)
  @IsString()
  @Column('varchar')
  state: OrderState;

  @Field((type) => Boolean)
  @IsBoolean()
  @Column({ default: true })
  active: boolean;

  @Field((type) => Date)
  @IsDate()
  @Column({ nullable: true })
  orderPlacedAt?: Date;

  @Field((type) => OrderLine, { nullable: true })
  @OneToMany((type) => OrderLine, (line) => line.order)
  lines: OrderLine[];

  @Field((type) => Address)
  @Column('simple-json')
  shippingAddress: OrderAddress;

  @Field((type) => Address)
  @Column('simple-json')
  billingAddress: OrderAddress;

  @Field((type) => Payment, { nullable: true })
  @OneToMany((type) => Payment, (payment) => payment.order)
  payments: Payment[];

  @Field((type) => CurrencyCode)
  @Column('varchar')
  currencyCode: CurrencyCode;

  @Field((type) => Number)
  @Column({ nullable: true })
  taxZoneId?: number;

  @Field((type) => [Channel])
  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];

  @Field((type) => OrderModification, { nullable: true })
  @OneToMany((type) => OrderModification, (modification) => modification.order)
  modifications: OrderModification[];

  @Field((type) => Number)
  @IsNumber()
  @Column()
  subTotal: number;

  @Field((type) => Number)
  @IsNumber()
  @Column()
  subTotalWithTax: number;

  @Field((type) => ShippingLine, { nullable: true })
  @OneToMany((type) => ShippingLine, (shippingLine) => shippingLine.order)
  shippingLines: ShippingLine[];

  @Field((type) => Number)
  @IsNumber()
  @Column({ default: 0 })
  shipping: number;

  @Field((type) => Number)
  @IsNumber()
  @Column({ default: 0 })
  shippingWithTax: number;
}
