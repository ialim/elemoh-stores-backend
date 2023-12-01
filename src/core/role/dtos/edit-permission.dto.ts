import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Permission } from '../entities/permission.entity';

@InputType()
export class EditPermissionInput extends PartialType(
  OmitType(Permission, ['createdAt', 'updatedAt', 'id']),
) {
  @Field((type) => Number)
  permissionId: number;
}

@ObjectType()
export class EditPermissionOutput extends CoreOutput {}
