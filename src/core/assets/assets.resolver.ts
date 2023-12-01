import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetsService } from './assets.service';
import { CreateAssetInput, CreateAssetOutput } from './dtos/create-asset.dto';
import { DeleteAssetInput, DeleteAssetOutput } from './dtos/delete-asset.dto';
import { EditAssetInput, EditAssetOutput } from './dtos/edit-asset.dto';
import { FindAssetInput, FindAssetOutput } from './dtos/find-asset.dto';
import {
  MultipleUploadAssetInput,
  MultipleUploadAssetOutput,
} from './dtos/multiple-upload-asset.dto';
import {
  SingleUploadAssetInput,
  SingleUploadAssetOutput,
} from './dtos/single-upload-asset.dto';
import { Asset } from './entities/asset.entity';

@Resolver((of) => Asset)
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Mutation((returns) => CreateAssetOutput)
  async createAsset(
    @Args('input') createAssetInput: CreateAssetInput,
  ): Promise<CreateAssetOutput> {
    return await this.assetsService.createAsset(createAssetInput);
  }

  @Mutation((returns) => EditAssetOutput)
  async editAsset(
    @Args('input') editAssetInput: EditAssetInput,
  ): Promise<EditAssetOutput> {
    return await this.assetsService.editAsset(editAssetInput);
  }

  @Mutation((returns) => DeleteAssetOutput)
  async deleteAsset(
    @Args() deleteAssetInput: DeleteAssetInput,
  ): Promise<DeleteAssetOutput> {
    return await this.assetsService.deleteAsset(deleteAssetInput);
  }

  @Mutation((returns) => SingleUploadAssetOutput)
  async singleAssetUpload(
    @Args('input') singleUploadAssetInput: SingleUploadAssetInput,
  ): Promise<SingleUploadAssetOutput> {
    return await this.assetsService.singleAssetUpload(singleUploadAssetInput);
  }

  @Mutation((returns) => MultipleUploadAssetOutput)
  async multipleAssetUpload(
    @Args('input') multipleUploadAssetInput: MultipleUploadAssetInput,
  ): Promise<SingleUploadAssetOutput> {
    return await this.assetsService.multipleAssetUpload(
      multipleUploadAssetInput,
    );
  }

  @Query((returns) => FindAssetOutput)
  async findAsset(
    @Args() findAssetInput: FindAssetInput,
  ): Promise<FindAssetOutput> {
    return await this.assetsService.findById(findAssetInput);
  }
}
