import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Permission } from '../entities/permission.entity';

@InputType()
export class CreatePermissionInput extends OmitType(Permission, [
  'createdAt',
  'updatedAt',
  'id',
]) {
  @Field((type) => Number)
  roleId: number;
}

@ObjectType()
export class CreatePermissionOutput extends CoreOutput {}
