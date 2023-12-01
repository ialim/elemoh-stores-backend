import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Supplier } from '../entities/supplier.entity';

@InputType()
export class CreateSupplierInput extends OmitType(Supplier, [
  'createdAt',
  'updatedAt',
  'id',
]) {
  @Field((type) => Number)
  personId: number;
}

@ObjectType()
export class CreateSupplierOutput extends CoreOutput {}
