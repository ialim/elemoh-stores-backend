import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Address } from 'src/core/addresses/entities/address.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Employee } from 'src/core/employees/entities/employee.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@InputType('StoreInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Store extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(10)
  name: string;

  @OneToOne((type) => Employee, { onDelete: 'SET NULL' })
  @JoinColumn()
  manager: Employee;

  @Field((type) => Address)
  @OneToOne((type) => Address)
  @JoinColumn()
  address: Address;
}
