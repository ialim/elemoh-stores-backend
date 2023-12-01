import { CoreEntity } from 'src/common/entities/core.entity';
import { ProductVariant } from 'src/core/products/entities/product-variant.entity';
import { Column, Entity, ManyToOne, TableInheritance } from 'typeorm';
import { StockMovementType } from 'src/common/generated-types';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

/**
 * @description
 * A StockMovement is created whenever stock of a particular ProductVariant goes in
 * or out.
 *
 * @docsCategory entities
 */
@InputType('StockMovementInputType', { isAbstract: true })
@ObjectType()
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'discriminator' } })
export abstract class StockMovement extends CoreEntity {
  @Column({ nullable: false, type: 'varchar' })
  readonly type: StockMovementType;

  @Field((type) => ProductVariant)
  @ManyToOne((type) => ProductVariant, (variant) => variant.stockMovements)
  productVariant: ProductVariant;

  @Field((type) => Number)
  @Column()
  quantity: number;
}
