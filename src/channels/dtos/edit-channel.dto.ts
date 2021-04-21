import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Channel } from '../entities/channel.entity';

@InputType()
export class EditChannelInput extends PartialType(
  PickType(Channel, [
    'name',
    'code',
    'currencyCode',
    'defaultLanguageCode',
    'pricesIncludeTax',
  ]),
) {
  @Field((type) => Number)
  channelId: number;
}

@ObjectType()
export class EditChannelOutput extends CoreOutput {}
