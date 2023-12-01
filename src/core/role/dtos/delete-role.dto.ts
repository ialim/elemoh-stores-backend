import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteRoleInput {
  @Field((type) => Number)
  roleId: number;
}

@ObjectType()
export class DeleteRoleOutput extends CoreOutput {}
