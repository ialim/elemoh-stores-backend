import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsModule } from 'src/core/assets/assets.module';
import { ChannelsModule } from 'src/core/channels/channels.module';
import { ProductAsset } from './entities/product-asset.entity';
import { ProductVariantAsset } from './entities/product-variant-asset.entity';
import { ProductVariantPrice } from './entities/product-variant-price.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductVariant,
      ProductVariantPrice,
      Product,
      ProductVariantAsset,
      ProductAsset,
    ]),
    AssetsModule,
    ChannelsModule,
  ],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
