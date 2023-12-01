import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Department } from '../entities/department.entity';

@ObjectType()
export class AllDepartmentOutput extends CoreOutput {
  @Field((type) => [Department], { nullable: true })
  departments?: Department[];
}
