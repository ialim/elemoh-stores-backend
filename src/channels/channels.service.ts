import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllChannelOutput } from './dtos/all-channels.dto';
import {
  CreateChannelInput,
  CreateChannelOutput,
} from './dtos/create-channel.dto';
import {
  DeleteChannelInput,
  DeleteChannelOutput,
} from './dtos/delete-channel.dto';
import { EditChannelInput, EditChannelOutput } from './dtos/edit-channel.dto';
import { FindChannelInput, FindChannelOutput } from './dtos/find-channel.dto';
import { Channel } from './entities/channel.entity';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel) private readonly channels: Repository<Channel>,
  ) {}

  async createChannel({
    name,
    code,
    defaultLanguageCode,
    currencyCode,
    pricesIncludeTax,
  }: CreateChannelInput): Promise<CreateChannelOutput> {
    try {
      const channel = await this.channels.findOne({ code });
      if (!channel) {
        await this.channels.save(
          this.channels.create({
            name,
            code,
            currencyCode,
            defaultLanguageCode,
            pricesIncludeTax,
          }),
        );
        return { ok: true, error: null };
      }
      return { ok: false, error: 'Channel already exist' };
    } catch (error) {
      return { ok: false, error: error };
    }
  }

  async editChannel({
    name,
    channelId,
    code,
    defaultLanguageCode,
    currencyCode,
    pricesIncludeTax,
  }: EditChannelInput): Promise<EditChannelOutput> {
    try {
      const channel = await this.channels.findOne({ id: channelId });
      if (channel) {
        name && (channel.name = name);
        code && (channel.code = code);
        defaultLanguageCode &&
          (channel.defaultLanguageCode = defaultLanguageCode);
        currencyCode && (channel.currencyCode = currencyCode);
        pricesIncludeTax && (channel.pricesIncludeTax = pricesIncludeTax);
        await this.channels.save(channel);
        return {
          ok: true,
          error: null,
        };
      } else {
        return {
          ok: false,
          error: 'channel not found',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async deleteChannel({
    channelId,
  }: DeleteChannelInput): Promise<DeleteChannelOutput> {
    try {
      const channel = await this.channels.findOne({ id: channelId });
      if (channel) {
        await this.channels.remove(channel);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: true,
        error: 'Channel not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async findAll(): Promise<AllChannelOutput> {
    try {
      const channels = await this.channels.find();
      if (channels) {
        return {
          ok: true,
          error: null,
          channels: channels,
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

  async findById({ channelId }: FindChannelInput): Promise<FindChannelOutput> {
    try {
      const channel = await this.channels.findOne({ id: channelId });
      if (!channel) {
        return { ok: false, error: 'channel not found' };
      }
      return { ok: true, error: null, channel };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
