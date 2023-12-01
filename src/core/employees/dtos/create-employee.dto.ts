import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Employee } from '../entities/employee.entity';

@InputType()
export class CreateEmployeeInput extends OmitType(Employee, [
  'createdAt',
  'updatedAt',
  'id',
  'profile',
  'department',
]) {
  @Field((type) => Number)
  departmentId: number;

  @Field((type) => Number)
  personId: number;
}

@ObjectType()
export class CreateEmployeeOutput extends CoreOutput {}
