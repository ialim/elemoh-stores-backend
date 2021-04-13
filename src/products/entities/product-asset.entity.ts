import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class ProductAsset extends CoreEntity {
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
