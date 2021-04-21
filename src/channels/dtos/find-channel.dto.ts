import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Channel } from '../entities/channel.entity';

@ArgsType()
export class FindChannelInput {
  @Field((type) => Number)
  channelId: number;
}

@ObjectType()
export class FindChannelOutput extends CoreOutput {
  @Field((type) => Channel)
  channel?: Channel;
}
