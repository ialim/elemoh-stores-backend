import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Department } from '../entities/department.entity';

@InputType()
export class CreateDepartmentInput extends OmitType(Department, [
  'createdAt',
  'updatedAt',
  'id',
]) {}

@ObjectType()
export class CreateDepartmentOutput extends CoreOutput {}
