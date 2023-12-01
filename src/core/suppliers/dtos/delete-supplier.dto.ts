import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteSupplierInput {
  @Field((type) => Number)
  supplierId: number;
}

@ObjectType()
export class DeleteSupplierOutput extends CoreOutput {}
