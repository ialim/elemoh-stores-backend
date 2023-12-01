import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Channel } from '../entities/channel.entity';

@ObjectType()
export class AllChannelOutput extends CoreOutput {
  @Field((type) => [Channel], { nullable: true })
  channels?: Channel[];
}
