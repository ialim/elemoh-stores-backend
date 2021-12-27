import { Asset } from 'src/assets/entities/asset.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Allocation } from 'src/stock-movements/entities/stock-allocation.entity';
import { ProductVariant } from 'src/products/entities/product-variant.entity';
import { Sale } from 'src/stock-movements/entities/stock-sale.entity';
import { TaxCategory } from 'src/taxrates/entities/tax-category.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
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

  @OneToMany((type) => OrderItem, (item) => item.line)
  items: OrderItem[];

  @ManyToOne((type) => Order, (order) => order.lines, { onDelete: 'CASCADE' })
  order: Order;

  // @OneToMany((type) => Sale, (sale) => sale.orderLineSale)
  // sales: Sale[];

  // @OneToMany((type) => Allocation, (allocation) => allocation.orderLineAlloc)
  // allocations: Allocation[];
}
