import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { Store } from 'src/stores/entities/store.entity';
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
import { Order } from './order.entity';

@ObjectType()
@Entity()
export class Sale extends CoreEntity {
  @Field((type) => Order)
  @OneToOne((type) => Order)
  @JoinColumn()
  order: Order;

  @Field((type) => [String], { nullable: true })
  @Column('simple-array')
  couponCodes: string[];

  @Field((type) => Customer)
  @ManyToOne((type) => Customer)
  customer: Customer;

  @Field((type) => Promotion, { nullable: true })
  @ManyToMany((type) => Promotion)
  @JoinTable()
  promotions: Promotion[];

  @Field((type) => Store)
  @ManyToOne((type) => Store)
  fromStore: Store;

  @Field((type) => Surcharge, { nullable: true })
  @OneToMany((type) => Surcharge, (surcharge) => surcharge.order)
  surcharges: Surcharge[];

  @Field((type) => Employee)
  @ManyToOne((type) => Employee)
  biller: Employee;
}
