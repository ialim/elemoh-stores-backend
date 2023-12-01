import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Role } from '../entities/role.entity';

@ObjectType()
export class AllRoleOutput extends CoreOutput {
  @Field((type) => [Role], { nullable: true })
  roles?: Role[];
}
