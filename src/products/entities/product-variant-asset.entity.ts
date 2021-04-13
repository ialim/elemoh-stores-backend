import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductVariant } from './product-variant.entity';

ObjectType();
@Entity()
export class ProductVariantAsset extends CoreEntity {
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
