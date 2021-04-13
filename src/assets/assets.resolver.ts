import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AssetsService } from './assets.service';
import { CreateAssetInput, CreateAssetOutput } from './dtos/create-asset.dto';
import { DeleteAssetInput, DeleteAssetOutput } from './dtos/delete-asset.dto';
import { EditAssetInput, EditAssetOutput } from './dtos/edit-asset.dto';
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
}
