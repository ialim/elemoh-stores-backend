import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreatePersonInput } from 'src/people/dtos/create-person.dto';
import { Supplier } from '../entities/supplier.entity';

@InputType()
export class CreateSupplierInput extends OmitType(Supplier, [
  'createdAt',
  'updatedAt',
  'id',
]) {
  @Field((type) => CreatePersonInput)
  personInput: CreatePersonInput;
}

@ObjectType()
export class CreateSupplierOutput extends CoreOutput {}
