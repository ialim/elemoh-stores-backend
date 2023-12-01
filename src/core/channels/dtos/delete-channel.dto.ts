import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class DeleteChannelInput {
  @Field((type) => Number)
  channelId: number;
}

@ObjectType()
export class DeleteChannelOutput extends CoreOutput {}
