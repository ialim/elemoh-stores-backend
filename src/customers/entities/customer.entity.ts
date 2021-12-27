import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate } from 'class-validator';
import { Channel } from 'src/channels/entities/channel.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Sale } from 'src/orders/entities/order-sale.entity';
import { Person } from 'src/people/entities/people.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CustomerGroup } from './customer-group.etity';

@ObjectType()
@Entity()
export class Customer extends CoreEntity {
  @Field((type) => Date)
  @Column({ type: Date, nullable: true })
  @IsDate()
  deletedAt: Date | null;

  @Field((type) => Person, { nullable: true })
  @OneToOne((type) => Person, { eager: true })
  @JoinColumn()
  person: Person;

  @Field((type) => [CustomerGroup], { nullable: true })
  @ManyToMany((type) => CustomerGroup, (group) => group.customers)
  @JoinTable()
  groups: CustomerGroup[];

  @Field((type) => [Sale], { nullable: true })
  @OneToMany((type) => Sale, (sale) => sale.customer)
  sales: Sale[];

  @Field((type) => [Channel])
  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
