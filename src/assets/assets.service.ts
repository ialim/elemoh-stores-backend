import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssetInput, CreateAssetOutput } from './dtos/create-asset.dto';
import { DeleteAssetInput, DeleteAssetOutput } from './dtos/delete-asset.dto';
import { EditAssetInput, EditAssetOutput } from './dtos/edit-asset.dto';
import { MultipleUploadAssetOutput } from './dtos/multiple-upload-asset.dto';
import {
  SingleUploadAssetInput,
  SingleUploadAssetOutput,
} from './dtos/single-upload-asset.dto';
import { Asset } from './entities/asset.entity';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream, unlink } from 'fs';
import { FindAssetInput, FindAssetOutput } from './dtos/find-asset.dto';

const UPLOAD_DIR = './uploads';

const storeUpload = async (file) => {
  const { filename, mimetype, encoding, createReadStream } = await file;
  const stream = createReadStream();
  const id = uuidv4(2);
  const path = `${UPLOAD_DIR}/${id}-${filename.replace(/ /g, '-')}`;

  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(path);

    writeStream.on('open', () => {
      console.log('Stream opened');
    });
    writeStream.on('ready', () => {
      console.log('Stream ready');
    });
    // writeStream.on('pipe', (src) => {
    //   console.log(src);
    // });
    // writeStream.on('unpipe', (src) => {
    //   console.log(src);
    // });

    // When the upload is fully written, resolve the promise
    writeStream.on('finish', resolve);

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on('error', (error) => {
      unlink(path, () => {
        console.log('error stream', error);
        reject(error);
      });
    });

    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on('error', (error) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });

  console.log(filename, mimetype, encoding);
  return filename;
};
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

  async singleAssetUpload({
    file,
  }: SingleUploadAssetInput): Promise<SingleUploadAssetOutput> {
    try {
      const result = await storeUpload(file);
      if (result) {
        console.log(result);
        return {
          ok: true,
          error: null,
        };
      }
    } catch (error) {
      return { ok: false, error };
    }
  }

  async multipleAssetUpload({ files }): Promise<MultipleUploadAssetOutput> {
    try {
      const results = await Promise.all(files.map(storeUpload));
      if (results) {
        console.log(results);

        return {
          ok: true,
          error: null,
        };
      }
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findById({ assetId }: FindAssetInput): Promise<FindAssetOutput> {
    try {
      const asset = await this.assets.findOne({ id: assetId });
      if (!asset) {
        return { ok: false, error: 'Asset not found' };
      }
      return { ok: true, error: null, asset };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
