import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  EditPersonInput,
  EditPersonOutput,
} from 'src/people/dtos/edit-person.dto';
import { Supplier } from '../entities/supplier.entity';

@InputType()
export class EditSupplierInput extends PartialType(
  OmitType(Supplier, ['createdAt', 'updatedAt', 'id', 'person']),
) {
  @Field((type) => Number)
  supplierId?: number;

  @Field((type) => EditPersonOutput)
  personInput: EditPersonInput;
}

@ObjectType()
export class EditSupplierOutput extends CoreOutput {}
