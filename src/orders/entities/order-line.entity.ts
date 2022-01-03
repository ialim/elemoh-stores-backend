import { Asset } from 'src/assets/entities/asset.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { ProductVariant } from 'src/products/entities/product-variant.entity';
import { TaxCategory } from 'src/taxrates/entities/tax-category.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class OrderLine extends CoreEntity {
  @ManyToOne((type) => ProductVariant)
  productVariant: ProductVariant;

  @ManyToOne((type) => TaxCategory)
  taxCategory: TaxCategory;

  @ManyToOne((type) => Asset)
  featuredAsset: Asset;

  @ManyToOne((type) => Order, (order) => order.lines, { onDelete: 'CASCADE' })
  order: Order;
}
