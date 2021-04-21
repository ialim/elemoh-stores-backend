import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChannelsService } from './channels.service';
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

@Resolver((of) => Channel)
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

  @Mutation((returns) => CreateChannelOutput)
  async createChannel(
    @Args('input') createChannelInput: CreateChannelInput,
  ): Promise<CreateChannelOutput> {
    return await this.channelsService.createChannel(createChannelInput);
  }

  @Mutation((returns) => EditChannelOutput)
  async editChannel(
    @Args('input') editChannelInput: EditChannelInput,
  ): Promise<EditChannelOutput> {
    return await this.channelsService.editChannel(editChannelInput);
  }

  @Mutation((returns) => DeleteChannelOutput)
  async deleteChannel(
    @Args() deleteChannelInput: DeleteChannelInput,
  ): Promise<EditChannelOutput> {
    return await this.channelsService.deleteChannel(deleteChannelInput);
  }

  @Query((returns) => AllChannelOutput)
  async allChannels(): Promise<AllChannelOutput> {
    return await this.channelsService.findAll();
  }

  @Query((returns) => FindChannelOutput)
  async findChannel(
    @Args() findChannelInput: FindChannelInput,
  ): Promise<FindChannelOutput> {
    return await this.channelsService.findById(findChannelInput);
  }
}
