import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { Asset } from 'src/core/assets/entities/asset.entity';
import { Channel } from 'src/core/channels/entities/channel.entity';
import { Collection } from 'src/core/collections/entities/collection.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { CurrencyCode, GlobalFlag } from 'src/common/generated-types';
import { FacetValue } from 'src/core/facets/entities/facet-value.entity';
import { StockMovement } from 'src/core/stock-movements/entities/stock-movement.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductVariantAsset } from './product-variant-asset.entity';
import { ProductVariantPrice } from './product-variant-price.entity';
import { Product } from './product.entity';

registerEnumType(CurrencyCode, { name: 'CurrencyCode' });
registerEnumType(GlobalFlag, { name: 'GlobalFlag' });

/**
 * @description
 * A ProductVariant represents a single stock keeping unit (SKU) in the store's inventory.
 * Whereas a {@link Product} is a "container" of variants, the variant itself holds the
 * data on price, tax category etc. When one adds items to their cart, they are adding
 * ProductVariants, not Products.
 *
 * @docsCategory entities
 */

@InputType('ProductVariantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class ProductVariant extends CoreEntity {
  @Column({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  barcode: number;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  name: string;

  @Field((type) => Boolean)
  @Column({ default: true })
  @IsBoolean()
  enabled: boolean;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  listPrice: number;

  @Field((type) => Boolean)
  @Column()
  @IsBoolean()
  listPriceIncludesTax: boolean;

  @Field((type) => CurrencyCode)
  @Column({ type: 'enum', enum: CurrencyCode })
  @IsEnum(CurrencyCode)
  currencyCode: CurrencyCode;

  @Field((type) => Asset)
  @ManyToOne((type) => Asset, { onDelete: 'SET NULL' })
  featuredAsset: Asset;

  @Field((type) => [ProductVariantAsset], { nullable: true })
  @OneToMany(
    (type) => ProductVariantAsset,
    (productVariantAsset) => productVariantAsset.productVariant,
    {
      onDelete: 'SET NULL',
    },
  )
  assets: ProductVariantAsset[];

  @Field((type) => [ProductVariantPrice])
  @OneToMany((type) => ProductVariantPrice, (price) => price.variant, {
    eager: true,
  })
  productVariantPrices: ProductVariantPrice[];

  @Field((type) => Product)
  @ManyToOne((type) => Product, (product) => product.variants)
  product: Product;

  @Field((type) => Number)
  @Column({ nullable: true })
  @IsNumber()
  productId: number;

  @Field((type) => Number)
  @Column({ default: 0 })
  @IsNumber()
  stockOnHand: number;

  @Field((type) => Number)
  @Column({ default: 0 })
  @IsNumber()
  stockAllocated: number;

  /**
   * @description
   * Specifies the value of stockOnHand at which the ProductVariant is considered
   * out of stock.
   */
  @Field((type) => Number)
  @Column({ default: 0 })
  @IsNumber()
  outOfStockThreshold: number;

  /**
   * @description
   * When true, the `outOfStockThreshold` value will be taken from the GlobalSettings and the
   * value set on this ProductVariant will be ignored.
   */
  @Field((type) => Boolean)
  @Column({ default: true })
  @IsBoolean()
  useGlobalOutOfStockThreshold: boolean;

  @Field((type) => GlobalFlag)
  @Column({ type: 'enum', enum: GlobalFlag, default: GlobalFlag.INHERIT })
  @IsEnum(GlobalFlag)
  trackInventory: GlobalFlag;

  @Field((type) => [StockMovement], { nullable: true })
  @OneToMany(
    (type) => StockMovement,
    (stockMovement) => stockMovement.productVariant,
  )
  stockMovements: StockMovement[];

  @Field((type) => [FacetValue], { nullable: true })
  @ManyToMany((type) => FacetValue)
  @JoinTable()
  facetValues: FacetValue[];

  @Field((type) => [Collection], { nullable: true })
  @ManyToMany((type) => Collection, (collection) => collection.productVariants)
  collections: Collection[];

  @Field((type) => [Channel])
  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
