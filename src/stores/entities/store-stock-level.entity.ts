import { Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { ProductVariant } from 'src/products/entities/product-variant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class StoreStockLevel extends CoreEntity {
  @Field((type) => Store)
  @ManyToOne((type) => Store)
  store: Store;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  quantity: number;

  @Field((type) => ProductVariant)
  @ManyToOne((type) => ProductVariant)
  variant: ProductVariant;
}
