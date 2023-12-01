import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/people.entity';
import { PersonsResolver } from './people.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PeopleService, PersonsResolver],
  exports: [PeopleService],
})
export class PeopleModule {}
