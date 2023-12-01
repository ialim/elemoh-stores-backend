import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, IsNull, ManyToOne } from 'typeorm';
import { ProductVariant } from './product-variant.entity';

@InputType('ProductVariantPriceInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ProductVariantPrice extends CoreEntity {
  @Field((type) => Number)
  @Column()
  @IsNumber()
  price: number;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  channelId: number;

  @Field((type) => ProductVariant)
  @ManyToOne(
    (type) => ProductVariant,
    (variant) => variant.productVariantPrices,
  )
  variant: ProductVariant;
}
