import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Department } from '../entities/department.entity';

@InputType()
export class EditDepartmentInput extends PartialType(
  OmitType(Department, ['createdAt', 'updatedAt', 'id']),
) {
  @Field((type) => Number)
  departmentId: number;
}

@ObjectType()
export class EditDepartmentOutput extends CoreOutput {}
