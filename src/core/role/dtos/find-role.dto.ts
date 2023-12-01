import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Role } from '../entities/role.entity';

@ArgsType()
export class FindRoleInput {
  @Field((type) => Number)
  roleId: number;
}

@ObjectType()
export class FindRoleOutput extends CoreOutput {
  @Field((type) => Role)
  role?: Role;
}
