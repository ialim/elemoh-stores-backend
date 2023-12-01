import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Person } from 'src/core/people/entities/people.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Department } from './department.entity';

@InputType('EmployeeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Employee extends CoreEntity {
  @Field((type) => Person)
  @OneToOne((type) => Person)
  @JoinColumn()
  profile: Person;

  @Field((type) => Department)
  @ManyToOne((type) => Department, (department) => department.employees)
  department: Department;
}
