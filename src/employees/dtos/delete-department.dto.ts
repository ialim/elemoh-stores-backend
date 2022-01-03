import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteDepartmentInput {
  @Field((type) => Number)
  departmentId: number;
}

@ObjectType()
export class DeleteDepartmentOutput extends CoreOutput {}
