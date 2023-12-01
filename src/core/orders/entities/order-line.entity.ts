import { Asset } from 'src/core/assets/entities/asset.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { ProductVariant } from 'src/core/products/entities/product-variant.entity';
import { TaxCategory } from 'src/core/taxrates/entities/tax-category.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType('OrderLineInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderLine extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  sku: string;

  @Field((type) => ProductVariant)
  @ManyToOne((type) => ProductVariant)
  productVariant: ProductVariant;

  @Field((type) => TaxCategory)
  @ManyToOne((type) => TaxCategory)
  taxCategory: TaxCategory;

  @Field((type) => Asset)
  @ManyToOne((type) => Asset)
  featuredAsset: Asset;

  @Field((type) => Order)
  @ManyToOne((type) => Order, (order) => order.lines, { onDelete: 'CASCADE' })
  order: Order;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  quantity: number;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  received: number;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  discount: number;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  tax: number;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  cost: number;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  total: number;
}
