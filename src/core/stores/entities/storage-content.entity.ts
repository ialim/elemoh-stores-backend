import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { ProductVariant } from 'src/core/products/entities/product-variant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { StoreStorage } from './store-storage.entity';

@InputType('StorageContentInputTypoe', { isAbstract: true })
@ObjectType()
@Entity()
export class StorageContent extends CoreEntity {
  @Field((type) => Number)
  @Column()
  @IsNumber()
  quantity: number;

  @Field((type) => ProductVariant)
  @ManyToOne((type) => ProductVariant)
  variant: ProductVariant;

  @Field((type) => StoreStorage)
  @ManyToOne((type) => StoreStorage, (storage) => storage.contents)
  storage: StoreStorage;
}
