import { CoreEntity } from 'src/common/entities/core.entity';
import { ProductVariant } from 'src/products/entities/product-variant.entity';
import { Column, Entity, ManyToOne, TableInheritance } from 'typeorm';
import { StockMovementType } from 'src/common/generated-types';

/**
 * @description
 * A StockMovement is created whenever stock of a particular ProductVariant goes in
 * or out.
 *
 * @docsCategory entities
 */
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'discriminator' } })
export abstract class StockMovement extends CoreEntity {
  @Column({ nullable: false, type: 'varchar' })
  readonly type: StockMovementType;

  @ManyToOne((type) => ProductVariant, (variant) => variant.stockMovements)
  productVariant: ProductVariant;

  @Column()
  quantity: number;
}
