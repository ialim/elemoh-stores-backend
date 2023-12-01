import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Supplier } from '../entities/supplier.entity';

@InputType()
export class EditSupplierInput extends PartialType(
  OmitType(Supplier, ['createdAt', 'updatedAt', 'id', 'person']),
) {
  @Field((type) => Number)
  supplierId?: number;
}

@ObjectType()
export class EditSupplierOutput extends CoreOutput {}
