import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Employee } from '../entities/employee.entity';

@ArgsType()
export class FindEmployeeInput {
  @Field((type) => Number)
  employeeId: number;
}

@ObjectType()
export class FindEmployeeOutput extends CoreOutput {
  @Field((type) => Employee)
  employee?: Employee;
}
