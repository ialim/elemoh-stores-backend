import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Role } from '../entities/role.entity';

@InputType()
export class EditRoleInput extends PartialType(
  OmitType(Role, ['createdAt', 'updatedAt', 'id', 'channels']),
) {
  @Field((type) => Number)
  roleId: number;

  @Field((type) => Number)
  channelId?: number;
}

@ObjectType()
export class EditRoleOutput extends CoreOutput {}
