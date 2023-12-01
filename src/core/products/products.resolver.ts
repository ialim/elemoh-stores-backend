import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { FindProductInput, FindProductOutput } from './dtos/find-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation((returns) => CreateProductOutput)
  async createProduct(
    @Args('input')
    createProductInput: CreateProductInput,
  ): Promise<CreateProductOutput> {
    return await this.productsService.createProduct(createProductInput);
  }

  @Mutation((returns) => EditProductOutput)
  async editProduct(
    @Args('input') editProductInput: EditProductInput,
  ): Promise<EditProductOutput> {
    return await this.productsService.editProduct(editProductInput);
  }

  @Mutation((returns) => DeleteProductOutput)
  async deleteProduct(
    @Args() deleteProductInput: DeleteProductInput,
  ): Promise<DeleteProductOutput> {
    return await this.productsService.deleteProduct(deleteProductInput);
  }

  @Query((returns) => FindProductOutput)
  async findProduct(
    @Args() findProductInput: FindProductInput,
  ): Promise<FindProductOutput> {
    return await this.productsService.findProduct(findProductInput);
  }

  @Mutation((returns) => CreateProductAssetOutput)
  async createProductAsset(
    @Args('input') createProductAssetInput: CreateProductAssetInput,
  ): Promise<CreateProductAssetOutput> {
    return await this.productsService.createProductAsset(
      createProductAssetInput,
    );
  }

  @Mutation((returns) => EditProductAssetOutput)
  async editProductAsset(
    @Args('input') editProductAssetInput: EditProductAssetInput,
  ): Promise<EditProductAssetOutput> {
    return await this.productsService.editProductAsset(editProductAssetInput);
  }

  @Mutation((returns) => DeleteProductAssetOutput)
  async deleteProductAsset(
    @Args() deleteProductAssetInput: DeleteProductAssetInput,
  ): Promise<DeleteProductAssetOutput> {
    return await this.productsService.deleteProductAsset(
      deleteProductAssetInput,
    );
  }

  @Mutation((returns) => CreateProductVariantAssetOutput)
  async createProductVariantAsset(
    @Args('input')
    createProductVariantAssetInput: CreateProductVariantAssetInput,
  ): Promise<CreateProductVariantAssetOutput> {
    return await this.productsService.createProductVariantAsset(
      createProductVariantAssetInput,
    );
  }

  @Mutation((returns) => EditProductVariantAssetOutput)
  async editProductVariantAsset(
    @Args('input') editProductVariantAssetInput: EditProductVariantAssetInput,
  ): Promise<EditProductVariantAssetOutput> {
    return await this.productsService.editProductVariantAsset(
      editProductVariantAssetInput,
    );
  }

  @Mutation((returns) => DeleteProductVariantAssetOutput)
  async deleteProductVariantAsset(
    @Args() deleteProductVariantAssetInput: DeleteProductVariantAssetInput,
  ): Promise<DeleteProductVariantAssetOutput> {
    return await this.productsService.deleteProductVariantAsset(
      deleteProductVariantAssetInput,
    );
  }

  @Mutation((returns) => CreateProductVariantPriceOutput)
  async createProductVariantPrice(
    @Args('input')
    createProductVariantPriceInput: CreateProductVariantPriceInput,
  ): Promise<CreateProductVariantPriceOutput> {
    return await this.productsService.createProductVariantPrice(
      createProductVariantPriceInput,
    );
  }

  @Mutation((returns) => EditProductVariantPriceOutput)
  async editProductVariantPrice(
    @Args('input') editProductVariantPriceInput: EditProductVariantPriceInput,
  ): Promise<EditProductVariantPriceOutput> {
    return await this.productsService.editProductVariantPrice(
      editProductVariantPriceInput,
    );
  }

  @Mutation((returns) => DeleteProductVariantPriceOutput)
  async deleteProductVariantPrice(
    @Args() deleteProductVariantPriceInput: DeleteProductVariantPriceInput,
  ): Promise<DeleteProductVariantPriceOutput> {
    return await this.productsService.deleteProductVariantPrice(
      deleteProductVariantPriceInput,
    );
  }

  @Mutation((returns) => CreateProductVariantOutput)
  async createProductVariant(
    @Args('input')
    createProductVariantInput: CreateProductVariantInput,
  ): Promise<CreateProductVariantOutput> {
    return await this.productsService.createProductVariant(
      createProductVariantInput,
    );
  }

  @Mutation((returns) => EditProductVariantOutput)
  async editProductVariant(
    @Args('input') editProductVariantInput: EditProductVariantInput,
  ): Promise<EditProductVariantOutput> {
    return await this.productsService.editProductVariant(
      editProductVariantInput,
    );
  }

  @Mutation((returns) => DeleteProductVariantOutput)
  async deleteProductVariant(
    @Args() deleteProductVariantInput: DeleteProductVariantInput,
  ): Promise<DeleteProductVariantOutput> {
    return await this.productsService.deleteProductVariant(
      deleteProductVariantInput,
    );
  }

  @Query((returns) => AllProductVariantOutput)
  async findAllProductVariant(): Promise<AllProductVariantOutput> {
    return await this.productsService.findAllProductVariant();
  }
}
