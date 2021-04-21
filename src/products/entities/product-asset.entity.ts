import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { OrderableAsset } from 'src/assets/entities/orderable-asset.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@InputType('ProductAssetInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ProductAsset extends OrderableAsset {
  @Field((type) => Number)
  @Column()
  @IsNumber()
  productId: number;

  @Field((type) => Product)
  @ManyToOne((type) => Product, (product) => product.assets, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
