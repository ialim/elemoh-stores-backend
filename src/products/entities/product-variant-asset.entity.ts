import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { OrderableAsset } from 'src/assets/entities/orderable-asset.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductVariant } from './product-variant.entity';

@InputType('ProductVariantAssetInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ProductVariantAsset extends OrderableAsset {
  @Field((type) => Number)
  @Column()
  @IsNumber()
  productVariantId: number;

  @Field((type) => ProductVariant)
  @ManyToOne((type) => ProductVariant, (variant) => variant.assets, {
    onDelete: 'CASCADE',
  })
  productVariant: ProductVariant;
}
