import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Customer } from 'src/core/customers/entities/customer.entity';
import { Employee } from 'src/core/employees/entities/employee.entity';
import { Promotion } from 'src/core/promotions/entities/promotion.entity';
import { Store } from 'src/core/stores/entities/store.entity';
import { Surcharge } from 'src/core/surcharge/entities/surcharge.entity';
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

@InputType('SaleInputType', { isAbstract: true })
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
  @ManyToOne((type) => Customer, (customer) => customer.sales)
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
