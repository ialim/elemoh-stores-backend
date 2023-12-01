import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Department } from '../entities/department.entity';

@ArgsType()
export class FindDepartmentInput {
  @Field((type) => Number)
  departmentId: number;
}

@ObjectType()
export class FindDepartmentOutput extends CoreOutput {
  @Field((type) => Department)
  department?: Department;
}
