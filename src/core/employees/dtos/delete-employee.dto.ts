import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteEmployeeInput {
  @Field((type) => Number)
  employeeId: number;
}

@ObjectType()
export class DeleteEmployeeOutput extends CoreOutput {}
