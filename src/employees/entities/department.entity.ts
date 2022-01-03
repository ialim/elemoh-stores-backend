import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Employee } from './employee.entity';

@ObjectType()
@Entity()
export class Department extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => [Employee])
  @OneToMany((type) => Employee, (employee) => employee.department)
  employees: Employee[];
}
