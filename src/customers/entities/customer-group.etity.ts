import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Customer } from './customer.entity';

@ObjectType()
@Entity()
export class CustomerGroup extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  name: string;

  @Field((type) => [Customer], { nullable: true })
  @ManyToMany((type) => Customer, (customer) => customer.groups)
  customers: Customer[];
}
