import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { AllCollectionOutput } from './dtos/all-collections.dto';
import {
  CreateCollectionInput,
  CreateCollectionOutput,
} from './dtos/create-collection.dto';
import {
  DeleteCollectionInput,
  DeleteCollectionOutput,
} from './dtos/delete-collection.dto';
import {
  EditCollectionInput,
  EditCollectionOutput,
} from './dtos/edit-collection.dto';
import {
  CreateCollectionAssetInput,
  CreateCollectionAssetOutput,
} from './dtos/create-collection-asset.dto';
import { Collection } from './entities/collection.entity';
import { AssetsService } from 'src/assets/assets.service';
import { CollectionAsset } from './entities/collection-asset.entity';
import {
  EditCollectionAssetInput,
  EditCollectionAssetOutput,
} from './dtos/edit-collection-asset.dto';
import {
  DeleteCollectionAssetInput,
  DeleteCollectionAssetOutput,
} from './dtos/delete-collection-asset.dto';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly assetsService: AssetsService,
    @InjectRepository(Collection)
    private readonly collections: Repository<Collection>,
    @InjectRepository(Collection)
    private readonly collectionTree: TreeRepository<Collection>,
    @InjectRepository(CollectionAsset)
    private readonly collectionAssets: Repository<CollectionAsset>,
  ) {}

  async createCollection({
    name,
    slug,
    description,
    isRoot,
    isPrivate,
    position,
    parentId,
    featuredAssetId,
  }: CreateCollectionInput): Promise<CreateCollectionOutput> {
    try {
      const collection = await this.collections.findOne({ slug: slug });
      if (!collection) {
        const asset = await this.assetsService.findById({
          assetId: featuredAssetId,
        });
        if (isRoot) {
          await this.collections.save(
            this.collections.create({
              name,
              slug,
              description,
              isRoot,
              isPrivate,
              position,
              featuredAsset: asset.ok ? asset.asset : null,
            }),
          );
        } else {
          const parentCollection = await this.collections.findOne({
            id: parentId,
          });
          if (!parentCollection) {
            return { ok: false, error: 'Parent collection not found' };
          }
          await this.collections.save(
            this.collections.create({
              name,
              slug,
              description,
              isRoot,
              isPrivate,
              position,
              featuredAsset: asset.ok ? asset.asset : null,
              parent: parentCollection,
            }),
          );
        }
        return { ok: true, error: null };
      }
      return { ok: false, error: 'Collection already exist' };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async editCollection({
    collectionId,
    name,
    slug,
    description,
    isRoot,
    isPrivate,
    position,
    parentId,
    featuredAssetId,
  }: EditCollectionInput): Promise<EditCollectionOutput> {
    try {
      const collection = await this.collections.findOne({ id: collectionId });
      if (!collection) {
        return { ok: false, error: 'Collection not found' };
      }
      if (featuredAssetId) {
        const asset = await this.assetsService.findById({
          assetId: featuredAssetId,
        });
        collection.featuredAsset = asset.ok ? asset.asset : null;
      }
      name && (collection.name = name);
      slug && (collection.slug = slug);
      description && (collection.description = description);
      isRoot && (collection.isRoot = isRoot);
      isPrivate && (collection.isPrivate = isPrivate);
      position && (collection.position = position);
      if (isRoot) {
        await this.collections.save(collection);
      } else {
        if (parentId) {
          const parent = await this.collections.findOne({ id: parentId });
          collection.parent = parent;
        }
      }
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deleteCollection({
    collectionId,
  }: DeleteCollectionInput): Promise<DeleteCollectionOutput> {
    try {
      const collection = await this.collections.findOne({ id: collectionId });
      if (!collection) {
        return { ok: false, error: 'Collection not found' };
      }
      await this.collections.remove(collection);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async allCollection(): Promise<AllCollectionOutput> {
    try {
      const treeCollections = await this.collectionTree.findTrees();
      return { ok: true, error: null, collections: treeCollections };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createCollectionAsset({
    collectionId,
    assetId,
    position,
  }: CreateCollectionAssetInput): Promise<CreateCollectionAssetOutput> {
    try {
      const collection = await this.collections.findOne({ id: collectionId });
      const asset = await this.assetsService.findById({ assetId });
      if (!asset && !collection) {
        return {
          ok: false,
          error: 'Either Collection or Asset does not exist',
        };
      }
      await this.collectionAssets.save(
        this.collectionAssets.create({ assetId, collectionId, position }),
      );
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async editCollectionAsset({
    collectionId,
    assetId,
    position,
    collectionAssetId,
  }: EditCollectionAssetInput): Promise<EditCollectionAssetOutput> {
    try {
      const collectionAsset = await this.collectionAssets.findOne({
        id: collectionAssetId,
      });
      if (!collectionAsset) {
        return {
          ok: false,
          error: 'Either Colledtion or Asset does not exist',
        };
      }
      collectionId && (collectionAsset.collectionId = collectionId);
      assetId && (collectionAsset.assetId = assetId);
      position && (collectionAsset.position = position);
      await this.collectionAssets.save(collectionAsset);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deleteCollectionAsset({
    collectionAssetId,
  }: DeleteCollectionAssetInput): Promise<DeleteCollectionAssetOutput> {
    try {
      const CollectionAsset = await this.collectionAssets.findOne({
        id: collectionAssetId,
      });
      if (CollectionAsset) {
        await this.collectionAssets.remove(CollectionAsset);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: true,
        error: 'Collection Asset not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }
}
