import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CollectionsService } from './collections.service';
import { AllCollectionOutput } from './dtos/all-collections.dto';
import {
  CreateCollectionAssetInput,
  CreateCollectionAssetOutput,
} from './dtos/create-collection-asset.dto';
import {
  CreateCollectionInput,
  CreateCollectionOutput,
} from './dtos/create-collection.dto';
import {
  DeleteCollectionInput,
  DeleteCollectionOutput,
} from './dtos/delete-collection.dto';
import {
  DeleteCollectionAssetInput,
  DeleteCollectionAssetOutput,
} from './dtos/delete-collection-asset.dto';
import {
  EditCollectionAssetInput,
  EditCollectionAssetOutput,
} from './dtos/edit-collection-asset.dto';
import {
  EditCollectionInput,
  EditCollectionOutput,
} from './dtos/edit-collection.dto';
import { Collection } from './entities/collection.entity';

@Resolver((of) => Collection)
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Mutation((returns) => CreateCollectionOutput)
  async createCollection(
    @Args('input') createCollectionInput: CreateCollectionInput,
  ): Promise<CreateCollectionOutput> {
    return await this.collectionsService.createCollection(
      createCollectionInput,
    );
  }

  @Mutation((returns) => EditCollectionOutput)
  async editCollection(
    @Args('input') editCollectionInput: EditCollectionInput,
  ): Promise<EditCollectionOutput> {
    return await this.collectionsService.editCollection(editCollectionInput);
  }

  @Mutation((returns) => DeleteCollectionOutput)
  async deleteCollection(
    @Args() deleteCollectionInput: DeleteCollectionInput,
  ): Promise<DeleteCollectionOutput> {
    return await this.collectionsService.deleteCollection(
      deleteCollectionInput,
    );
  }

  @Query((returns) => AllCollectionOutput)
  async allCollection(): Promise<AllCollectionOutput> {
    return await this.collectionsService.allCollection();
  }

  @Mutation((returns) => CreateCollectionAssetOutput)
  async createCollectionAsset(
    @Args('input') createCollectionAssetInput: CreateCollectionAssetInput,
  ): Promise<CreateCollectionAssetOutput> {
    return await this.collectionsService.createCollectionAsset(
      createCollectionAssetInput,
    );
  }

  @Mutation((returns) => EditCollectionAssetOutput)
  async editCollectionAsset(
    @Args('input') editCollectionAssetInput: EditCollectionAssetInput,
  ): Promise<EditCollectionAssetOutput> {
    return await this.collectionsService.editCollectionAsset(
      editCollectionAssetInput,
    );
  }

  @Mutation((returns) => DeleteCollectionAssetOutput)
  async deleteCollectionAsset(
    @Args() deleteCollectionAssetInput: DeleteCollectionAssetInput,
  ): Promise<DeleteCollectionAssetOutput> {
    return this.collectionsService.deleteCollectionAsset(
      deleteCollectionAssetInput,
    );
  }
}
