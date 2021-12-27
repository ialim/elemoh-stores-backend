import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Refund } from 'src/refunds/entities/refund.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

export type PaymentState =
  | 'Created'
  | 'Authorized'
  | 'Settled'
  | 'Declined'
  | 'Error';

@Entity()
export class Payment extends CoreEntity {
  @Column() method: string;

  @Column() amount: number;

  @Column('varchar') state: PaymentState;

  @Column({ type: 'varchar', nullable: true })
  errorMessage: string | undefined;

  @Column({ nullable: true })
  transactionId: string;

  @ManyToOne((type) => Order, (order) => order.payments)
  order: Order;

  @OneToMany((type) => Refund, (refund) => refund.payment)
  refunds: Refund[];
}
