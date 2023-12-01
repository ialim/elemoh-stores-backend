import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Supplier } from '../entities/supplier.entity';

@ArgsType()
export class FindSupplierInput {
  @Field((type) => Number)
  supplierId: number;
}

@ObjectType()
export class FindSupplierOutput extends CoreOutput {
  @Field((type) => Supplier)
  supplier?: Supplier;
}
