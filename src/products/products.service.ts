import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsService } from 'src/assets/assets.service';
import { ChannelsService } from 'src/channels/channels.service';
import { Repository } from 'typeorm';
import {
  CreateProductAssetInput,
  CreateProductAssetOutput,
} from './dtos/create-product-asset.dto';
import {
  CreateProductVariantAssetInput,
  CreateProductVariantAssetOutput,
} from './dtos/create-product-variant-asset.dto';
import {
  CreateProductVariantPriceInput,
  CreateProductVariantPriceOutput,
} from './dtos/create-product-variant-price.dto';
import {
  CreateProductVariantInput,
  CreateProductVariantOutput,
} from './dtos/create-product-variant.dto';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-product.dto';
import {
  DeleteProductAssetInput,
  DeleteProductAssetOutput,
} from './dtos/delete-product-asset.dto';
import {
  DeleteProductVariantAssetInput,
  DeleteProductVariantAssetOutput,
} from './dtos/delete-product-variant-asset.dto';
import {
  DeleteProductVariantPriceInput,
  DeleteProductVariantPriceOutput,
} from './dtos/delete-product-variant-price.dto';
import {
  DeleteProductVariantInput,
  DeleteProductVariantOutput,
} from './dtos/delete-product-variant.dto';
import {
  DeleteProductInput,
  DeleteProductOutput,
} from './dtos/delete-product.dto';
import {
  EditProductAssetInput,
  EditProductAssetOutput,
} from './dtos/edit-product-asset.dto';
import {
  EditProductVariantAssetInput,
  EditProductVariantAssetOutput,
} from './dtos/edit-product-variant-asset.dto';
import {
  EditProductVariantPriceInput,
  EditProductVariantPriceOutput,
} from './dtos/edit-product-variant-price.dto';
import {
  EditProductVariantInput,
  EditProductVariantOutput,
} from './dtos/edit-product-variant.dto';
import { EditProductInput, EditProductOutput } from './dtos/edit-product.dto';
import { AllProductVariantOutput } from './dtos/find-all-product-variant.dto';
import {
  FindProductVariantInput,
  FindProductVariantOutput,
} from './dtos/find-product-varaint.dto';
import { FindProductInput, FindProductOutput } from './dtos/find-product.dto';
import { ProductAsset } from './entities/product-asset.entity';
import { ProductVariantAsset } from './entities/product-variant-asset.entity';
import { ProductVariantPrice } from './entities/product-variant-price.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly assetsService: AssetsService,
    @InjectRepository(Product) private readonly products: Repository<Product>,
    @InjectRepository(ProductAsset)
    private readonly productAssets: Repository<ProductAsset>,
    @InjectRepository(ProductVariantAsset)
    private readonly productVariantAssets: Repository<ProductVariantAsset>,
    @InjectRepository(ProductVariantPrice)
    private readonly productVariantPrices: Repository<ProductVariantPrice>,
    @InjectRepository(ProductVariant)
    private readonly productVariants: Repository<ProductVariant>,
  ) {}

  async createProduct({
    name,
    slug,
    description,
    enabled,
    channels,
    channelId,
    featuredAssetId,
  }: CreateProductInput): Promise<CreateProductOutput> {
    try {
      const product = await this.products.findOne({
        slug: slug,
      });
      const channel = await this.products.findOne({
        id: channelId,
      });
      const asset = await this.assetsService.findById({
        assetId: featuredAssetId,
      });
      if (!product && channel) {
        await this.products.save(
          this.products.create({
            name,
            slug,
            description,
            enabled,
            channels,
            featuredAsset: asset.ok ? asset.asset : null,
          }),
        );
        return { ok: true, error: null };
      }
      return { ok: false, error: 'This product already exist' };
    } catch (error) {
      return { ok: false, error: error };
    }
  }

  async editProduct({
    name,
    productId,
    slug,
    description,
    enabled,
    channels,
    featuredAssetId,
  }: EditProductInput): Promise<EditProductOutput> {
    try {
      const product = await this.products.findOne({ id: productId });
      if (product) {
        if (featuredAssetId) {
          const asset = await this.assetsService.findById({
            assetId: featuredAssetId,
          });
          product.featuredAsset = asset.ok ? asset.asset : null;
        }
        name && (product.name = name);
        slug && (product.slug = slug);
        description && (product.description = description);
        enabled && (product.enabled = enabled);
        channels && (product.channels = channels);
        await this.products.save(product);
        return {
          ok: true,
          error: null,
        };
      } else {
        return {
          ok: false,
          error: 'Product not found',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async deleteProduct({
    productId,
  }: DeleteProductInput): Promise<DeleteProductOutput> {
    try {
      const product = await this.products.findOne({ id: productId });
      if (product) {
        await this.products.remove(product);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: true,
        error: 'Product not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async findProduct({
    productId,
  }: FindProductInput): Promise<FindProductOutput> {
    try {
      const product = await this.products.findOne(
        {
          id: productId,
        },
        {
          relations: [
            'variants',
            'channels',
            'assets',
            'featuredAsset',
            'facetValues',
          ],
        },
      );
      if (!product) {
        return { ok: false, error: "Couldn't find product" };
      }
      return { ok: true, error: null, product };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createProductAsset({
    productId,
    assetId,
    position,
  }: CreateProductAssetInput): Promise<CreateProductAssetOutput> {
    try {
      const product = await this.products.findOne({ id: productId });
      const asset = await this.assetsService.findById({ assetId });
      if (!asset && !product) {
        return { ok: false, error: 'Either Product or Asset does not exist' };
      }
      await this.productAssets.save(
        this.productAssets.create({ assetId, productId, position }),
      );
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async editProductAsset({
    productId,
    assetId,
    position,
    productAssetId,
  }: EditProductAssetInput): Promise<EditProductAssetOutput> {
    try {
      const productAsset = await this.productAssets.findOne({
        id: productAssetId,
      });
      if (!productAsset) {
        return { ok: false, error: 'Either ProductAsset does not exist' };
      }
      productId && (productAsset.productId = productId);
      assetId && (productAsset.assetId = assetId);
      position && (productAsset.position = position);
      await this.productAssets.save(productAsset);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deleteProductAsset({
    productAssetId,
  }: DeleteProductAssetInput): Promise<DeleteProductAssetOutput> {
    try {
      const productAsset = await this.productAssets.findOne({
        id: productAssetId,
      });
      if (productAsset) {
        await this.productAssets.remove(productAsset);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: true,
        error: 'Product Asset not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async createProductVariantAsset({
    productVariantId,
    assetId,
    position,
  }: CreateProductVariantAssetInput): Promise<CreateProductVariantAssetOutput> {
    try {
      const productVariant = await this.productVariants.findOne({
        id: productVariantId,
      });
      const asset = await this.assetsService.findById({ assetId });
      if (!asset && !productVariant) {
        return { ok: false, error: 'Either Product or Asset does not exist' };
      }
      await this.productVariantAssets.save(
        this.productVariantAssets.create({
          assetId,
          productVariantId,
          position,
        }),
      );
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async editProductVariantAsset({
    productVariantId,
    assetId,
    position,
    productVariantAssetId,
  }: EditProductVariantAssetInput): Promise<EditProductVariantAssetOutput> {
    try {
      const productVariantAsset = await this.productVariantAssets.findOne({
        id: productVariantAssetId,
      });
      if (!productVariantAsset) {
        return {
          ok: false,
          error: 'Asset for this Product Variant does not exist',
        };
      }
      productVariantId &&
        (productVariantAsset.productVariantId = productVariantId);
      assetId && (productVariantAsset.assetId = assetId);
      position && (productVariantAsset.position = position);
      await this.productVariantAssets.save(productVariantAsset);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deleteProductVariantAsset({
    productVariantAssetId,
  }: DeleteProductVariantAssetInput): Promise<DeleteProductVariantAssetOutput> {
    try {
      const productVariantAsset = await this.productVariantAssets.findOne({
        id: productVariantAssetId,
      });
      if (productVariantAsset) {
        await this.productVariantAssets.remove(productVariantAsset);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: true,
        error: 'Product Variant Asset not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async createProductVariantPrice({
    price,
    channelId,
    variantId,
  }: CreateProductVariantPriceInput): Promise<CreateProductVariantPriceOutput> {
    try {
      const variant = await this.productVariants.findOne({
        id: variantId,
      });
      const channel = await this.channelsService.findById({ channelId });
      if (!channel && variant) {
        return { ok: false, error: 'Either Channel or Variant does not exist' };
      }
      const productVariantPrice = await this.productVariantPrices.findOne({
        channelId: channelId,
        variant: variant,
      });
      if (productVariantPrice) {
        return { ok: false, error: 'Product Variant price already exist' };
      }
      await this.productVariantPrices.save(
        this.productVariantPrices.create({
          price,
          channelId,
          variant,
        }),
      );
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async editProductVariantPrice({
    productVariantPriceId,
    channelId,
    price,
    variantId,
  }: EditProductVariantPriceInput): Promise<EditProductVariantPriceOutput> {
    try {
      const productVariantPrice = await this.productVariantPrices.findOne({
        id: productVariantPriceId,
      });
      if (!productVariantPrice) {
        return {
          ok: false,
          error: 'Price for this Product Variant does not exist',
        };
      }
      if (variantId) {
        const variant = await this.productVariants.findOne({ id: variantId });
        productVariantPrice.variant = variant;
      }
      price && (productVariantPrice.price = price);
      channelId && (productVariantPrice.channelId = channelId);
      await this.productVariantPrices.save(productVariantPrice);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deleteProductVariantPrice({
    productVariantPriceId,
  }: DeleteProductVariantPriceInput): Promise<DeleteProductVariantPriceOutput> {
    try {
      const productVariantPrice = await this.productVariantPrices.findOne({
        id: productVariantPriceId,
      });
      if (productVariantPrice) {
        await this.productVariantPrices.remove(productVariantPrice);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: true,
        error: 'Product Variant Price not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async createProductVariant(
    createProductVariantInput: CreateProductVariantInput,
  ): Promise<CreateProductVariantOutput> {
    try {
      const variant = await this.productVariants.findOne({
        sku: createProductVariantInput.sku,
      });
      if (!variant) {
        await this.productVariants.save(
          this.productVariants.create(createProductVariantInput),
        );
        return { ok: true, error: null };
      }
      return { ok: false, error: 'Variant already exist' };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async editProductVariant({
    name,
    productVariantId,
    sku,
    listPrice,
    stockOnHand,
    stockAllocated,
    listPriceIncludesTax,
    productId,
    currencyCode,
    featuredAsset,
    channels,
    outOfStockThreshold,
    useGlobalOutOfStockThreshold,
    trackInventory,
  }: EditProductVariantInput): Promise<EditProductVariantOutput> {
    try {
      const productVariant = await this.productVariants.findOne({
        id: productVariantId,
      });
      if (productVariant) {
        name && (productVariant.name = name);
        sku && (productVariant.sku = sku);
        listPrice && (productVariant.listPrice = listPrice);
        stockOnHand && (productVariant.stockOnHand = stockOnHand);
        channels && (productVariant.channels = channels);
        featuredAsset && (productVariant.featuredAsset = featuredAsset);
        stockAllocated && (productVariant.stockAllocated = stockAllocated);
        listPriceIncludesTax &&
          (productVariant.listPriceIncludesTax = listPriceIncludesTax);
        productId && (productVariant.productId = productId);
        currencyCode && (productVariant.currencyCode = currencyCode);
        outOfStockThreshold &&
          (productVariant.outOfStockThreshold = outOfStockThreshold);
        useGlobalOutOfStockThreshold &&
          (productVariant.useGlobalOutOfStockThreshold = useGlobalOutOfStockThreshold);
        trackInventory && (productVariant.trackInventory = trackInventory);
        await this.productVariants.save(productVariant);
        return {
          ok: true,
          error: null,
        };
      } else {
        return {
          ok: false,
          error: 'ProductVariant not found',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async deleteProductVariant({
    productVariantId,
  }: DeleteProductVariantInput): Promise<DeleteProductVariantOutput> {
    try {
      const productVariant = await this.productVariants.findOne({
        id: productVariantId,
      });
      if (productVariant) {
        await this.productVariants.remove(productVariant);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: false,
        error: 'ProductVariant not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async findAllProductVariant(): Promise<AllProductVariantOutput> {
    try {
      const productVariants = await this.productVariants.find({
        relations: ['channels'],
      });
      if (productVariants) {
        return {
          ok: true,
          error: null,
          productVariants: productVariants,
        };
      }
      return {
        ok: false,
        error: 'No channel available',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async findProductVariant({
    productVariantId,
  }: FindProductVariantInput): Promise<FindProductVariantOutput> {
    try {
      const productVariant = await this.productVariants.findOne({
        id: productVariantId,
      });
      if (productVariant) {
        return {
          ok: true,
          error: null,
          productVariant,
        };
      }
      return {
        ok: false,
        error: 'ProductVariant not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }
}
