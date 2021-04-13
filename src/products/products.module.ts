import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAsset } from './entities/product-asset.entity';
import { ProductVariantAsset } from './entities/product-variant-asset.entity';
import { ProductVariantPrice } from './entities/product-variant-price.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductVariant,
      ProductVariantPrice,
      Product,
      ProductVariantAsset,
      ProductAsset,
    ]),
  ],
})
export class ProductsModule {}
