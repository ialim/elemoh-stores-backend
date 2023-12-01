import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Role } from '../entities/role.entity';

@InputType()
export class CreateRoleInput extends PickType(Role, [
  'code',
  'description',
  'name',
]) {}

@ObjectType()
export class CreateRoleOutput extends CoreOutput {}
