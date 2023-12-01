import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Supplier } from '../entities/supplier.entity';

@ObjectType()
export class AllSupplierOutput extends CoreOutput {
  @Field((type) => [Supplier], { nullable: true })
  suppliers?: Supplier[];
}
