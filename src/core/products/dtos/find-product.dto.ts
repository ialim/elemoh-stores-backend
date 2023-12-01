import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Product } from '../entities/product.entity';

@ArgsType()
export class FindProductInput {
  @Field((type) => Number)
  productId: number;
}

@ObjectType()
export class FindProductOutput extends CoreOutput {
  @Field((type) => Product, { nullable: true })
  product?: Product;
}
