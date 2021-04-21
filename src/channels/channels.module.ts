import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { ChannelsResolver } from './channels.resolver';
import { ChannelsService } from './channels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  providers: [ChannelsResolver, ChannelsService],
  exports: [ChannelsService],
})
export class ChannelsModule {}
