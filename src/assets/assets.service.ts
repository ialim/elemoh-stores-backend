import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssetInput, CreateAssetOutput } from './dtos/create-asset.dto';
import { DeleteAssetInput, DeleteAssetOutput } from './dtos/delete-asset.dto';
import { EditAssetInput, EditAssetOutput } from './dtos/edit-asset.dto';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset) private readonly assets: Repository<Asset>,
  ) {}

  async createAsset({
    name,
    source,
    mimeType,
    type,
    width,
    height,
    fileSize,
    preview,
  }: CreateAssetInput): Promise<CreateAssetOutput> {
    try {
      const exists = await this.assets.findOne({ name });
      if (exists) {
        return { ok: false, error: 'This asset already exist' };
      }
      await this.assets.save(
        this.assets.create({
          name,
          source,
          mimeType,
          type,
          width,
          height,
          fileSize,
          preview,
        }),
      );
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return { ok: false, error: "Couldn't create asset" };
    }
  }

  async editAsset({ assetId, name }: EditAssetInput): Promise<EditAssetOutput> {
    try {
      const asset = await this.assets.findOne({ id: assetId });
      if (asset) {
        name && (asset.name = name);
        await this.assets.save(asset);
        return {
          ok: true,
          error: null,
        };
      } else {
        return {
          ok: false,
          error: 'asset not found',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async deleteAsset({ assetId }: DeleteAssetInput): Promise<DeleteAssetOutput> {
    try {
      const asset = await this.assets.findOne({ id: assetId });
      if (asset) {
        await this.assets.remove(asset);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: true,
        error: 'Asset not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }
}
