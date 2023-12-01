import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Employee } from '../entities/employee.entity';

@InputType()
export class EditEmployeeInput extends PartialType(
  OmitType(Employee, ['createdAt', 'updatedAt', 'id', 'department', 'profile']),
) {
  @Field((type) => Number)
  employeeId?: number;

  @Field((type) => Number)
  departmentId?: number;
}

@ObjectType()
export class EditEmployeeOutput extends CoreOutput {}
